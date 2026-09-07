import React from 'react';
import {render,screen,fireEvent,within} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import GameMode from './GameMode';
import GameInvitation from './GameInvitation';
import {readProgress,careerMonths,getXp,freshProgress} from './gameData';
beforeAll(()=>{window.scrollTo=jest.fn();});
beforeEach(()=>localStorage.clear());
const setup=()=>render(<MemoryRouter><GameMode/></MemoryRouter>);
const level=name=>fireEvent.click(within(screen.getByRole('navigation',{name:'Game levels'})).getByRole('button',{name:new RegExp(name)}));

test('invitation decline is playful, dismissible, and remembered',()=>{
 const {unmount}=render(<MemoryRouter><GameInvitation/></MemoryRouter>);
 fireEvent.click(screen.getByRole('button',{name:'No, just browsing'}));
 expect(screen.getByText('Boring? Maybe. Efficient? Definitely.')).toBeInTheDocument();
 fireEvent.click(screen.getByRole('button',{name:'Dismiss game invitation'}));
 expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
 unmount();render(<MemoryRouter><GameInvitation/></MemoryRouter>);
 expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
});
test('career character selection and pipeline puzzle award each chapter once',()=>{
 setup();
 fireEvent.click(screen.getByRole('button',{name:/The Data Architect 2024/}));
 fireEvent.click(screen.getByRole('button',{name:'Choose Data Architect'}));
 expect(readProgress().character).toBe('architect');
 expect(readProgress().completed).toEqual([0]);
 fireEvent.click(screen.getByRole('button',{name:'Gold',exact:true}));
 expect(readProgress().completed).toEqual([0]);
 ['Bronze','Silver','Gold'].forEach(name=>fireEvent.click(screen.getByRole('button',{name,exact:true})));
 expect(readProgress().completed).toEqual([0,1]);
 expect(screen.getByText('✓ Pipeline restored.')).toBeInTheDocument();
 expect(careerMonths()).toBe(46);
});
test('quest discovery is idempotent, inventory is capped, and saves survive remount',()=>{
 const {unmount}=setup();level('Quest log');
 const quest=screen.getByRole('button',{name:/The Reconciliation Rift/});fireEvent.click(quest);fireEvent.click(quest);
 expect(readProgress().viewedQuests).toEqual([1]);
 expect(screen.getByRole('link',{name:'Inspect the project'})).toHaveAttribute('href','https://github.com/ezhilan03/recon-engine');
 level('Inventory');
 ['ETL/ELT design','Incremental ingestion','Data modeling','Pipeline orchestration'].forEach(name=>fireEvent.click(screen.getByRole('button',{name:name+' +',exact:true})));
 expect(readProgress().equipped).toHaveLength(3);
 expect(screen.getByText(/Three slots, adventurer/)).toBeInTheDocument();
 const saved=readProgress();unmount();setup();expect(readProgress()).toEqual(saved);
 fireEvent.click(screen.getByRole('button',{name:'Unequip Data modeling'}));expect(readProgress().equipped).toHaveLength(2);
});
test('boss requires correct answers, preserves progress, and can be replayed',()=>{
 setup();level('Final boss');
 fireEvent.click(screen.getByRole('button',{name:/Skip the transformation/}));
 expect(readProgress().bossRound).toBe(0);
 const answers=['ETL/ELT design','RAGAS evaluation','Deterministic matching + agent exceptions'];
 answers.forEach((answer,i)=>{
  fireEvent.click(screen.getByRole('button',{name:answer+' ⚔',exact:true}));
  fireEvent.click(screen.getByRole('button',{name:i===2?'Defeat Data Chaos':'Next encounter',exact:true}));
 });
 expect(readProgress().bossRound).toBe(3);expect(readProgress().completed).toContain(5);
 expect(screen.getByRole('heading',{name:'Quest complete.'})).toBeInTheDocument();
 expect(screen.getByLabelText('Your name')).toBeRequired();
 expect(screen.getByLabelText('Email')).toHaveAttribute('type','email');
 fireEvent.click(screen.getByRole('button',{name:'Play the encounter again'}));
 expect(readProgress().bossRound).toBe(0);
});
test('corrupt or unsupported save data safely resets, and guild has no invented quotes',()=>{
 localStorage.setItem('ez-adventure-v1','invalid');expect(readProgress()).toEqual(freshProgress());
 localStorage.setItem('ez-adventure-v1',JSON.stringify({version:1,stage:99,character:'missing',completed:[0,0,9],equipped:['invented']}));
 const p=readProgress();expect(p.stage).toBe(5);expect(p.character).toBe('ranger');expect(p.completed).toEqual([0]);expect(p.equipped).toEqual([]);expect(getXp(p)).toBe(100);
 setup();level('NPC guild');expect(screen.getByText('The party is still gathering.')).toBeInTheDocument();expect(screen.queryByRole('blockquote')).not.toBeInTheDocument();
});
