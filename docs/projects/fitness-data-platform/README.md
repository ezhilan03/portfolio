# Fitness Data Platform

**v1.0.0 · synthetic data · on-demand AWS release**

[Public synthetic dashboard](https://ezhilan03.github.io/fitness-data-platform/) · [Code and verification](https://github.com/ezhilan03/fitness-data-platform)

Workout exports can contain multiple device representations, source corrections, delayed records and missing measurements. This project keeps those distinctions explicit instead of turning incomplete data into apparently precise activity totals.

The pipeline validates complete exports, preserves source revisions and receipt time, selects the versions known at a cutoff, resolves only explicitly shared device identities, and builds daily/weekly summaries. dbt tests check grain, quality and full-refresh parity; Airflow executes ingestion and transformation with real retry and backfill evidence.

The synthetic fixture starts with one 5,000-metre running session despite watch/phone records. A correction and late arrival produce two runs totalling 8,000 metres. Historical selection retains the earlier result. Unknown distances stay null, and distinct overlapping sessions are not silently merged.

Cloud batches run on demand in Fargate; a read-only Lambda API uses AWS IAM authentication. S3 holds private versioned state, CloudWatch records execution, and failures reach SQS. A recorded synthetic dashboard is public for demonstration. There is no always-on cloud compute service or database.

The hardest operational tradeoff was choosing the correct runtime: dbt's adapter requires POSIX semaphores, which Lambda does not supply. Keeping dbt in a full container and Lambda as a small authenticated read API avoids patching dependency internals.

Evidence includes 28 unit/integration tests, eight dbt fixture scenarios with 13 checks per build, seven scheduled Airflow intervals, automatic retry recovery, two historical backfills and a read-only/non-root container smoke test. Current AWS and hosted deployment evidence is linked in the repository's artifacts and Actions history.

This is an independently built portfolio project using synthetic data. It does not represent professional delivery at an employer, real patient data, clinical recommendations or a large-scale performance benchmark.
