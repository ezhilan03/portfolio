// Server-side Pages workflow guard: preserve approved design and published lineage.
const { execFileSync } = require('child_process');
const fs = require('fs');
const git = (...args) => execFileSync('git', args, {encoding:'utf8'}).trim();
const fail = message => { throw new Error(`Deployment blocked: ${message}`); };
(async () => {
 git('fetch', 'origin', 'main');
 const head = git('rev-parse', 'HEAD');
 if (head !== git('rev-parse', 'origin/main')) fail('source is behind origin/main.');
 const required = ['facbb87'];
 const response = await fetch('https://ezhilan03.github.io/portfolio/deployment-source.json', {cache:'no-store'});
 if (response.ok) {
   const previous = await response.json();
   if (!/^[a-f0-9]{40}$/.test(previous.sourceCommit || '')) fail('invalid live source manifest.');
   required.push(previous.sourceCommit);
 } else if (response.status !== 404) fail(`cannot inspect live source: HTTP ${response.status}`);
 else fail('live source manifest missing.');
 for (const ref of required) {
   try { git('merge-base', '--is-ancestor', ref, head); }
   catch { fail(`merge the previously approved/published source ${ref} before deploying.`); }
 }
 if (process.argv.includes('--stamp')) fs.writeFileSync('build/deployment-source.json', JSON.stringify({sourceCommit:head,designBaseline:git('rev-parse','facbb87'),builtAt:new Date().toISOString()},null,2)+'\n');
 console.log(`Deployment lineage verified: ${head}`);
})().catch(error => { console.error(error.message); process.exit(1); });
