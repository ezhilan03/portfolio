# Underwriting & Payment Risk

**v0.1.0 · independent synthetic project · verified $0 BigQuery Sandbox delivery**

[Release](https://github.com/ezhilan03/underwriting-payment-risk/releases/tag/v0.1.0) · [Verification record](https://github.com/ezhilan03/underwriting-payment-risk/blob/main/STATUS.md) · [Sandbox operations](https://github.com/ezhilan03/underwriting-payment-risk/blob/main/docs/SANDBOX.md)

## Problem

A decision-time risk feature must reflect what was actually known then. A later correction, immature outcome or policy-selected population can make a model look better without improving future decisions.

## Implementation

Two synthetic vendor schemas feed an append-only ledger with duplicate-safe ingestion and quarantine. Features require both effective and receipt times before the decision. Frozen outcome snapshots, temporal splits and an embargo separate training, validation and test evidence. Currency-specific policy comparisons distinguish attempted, settled and collected amounts.

A logistic baseline and gradient-boosted challenger run locally. BigQuery Sandbox holds six source tables and executes five dbt models. Cloud readback and source restoration reproduce local results; the dedicated GCP project has billing disabled and no linked billing account.

## Evidence and finding

The fixture contains 3,600 applications, 4,954 payment attempts/exposure snapshots and 7,200 retrospective scores. Seventeen dbt data tests pass on BigQuery. Exact cohort parity and full-field readback checks pass. A rerun reused all six source tables with zero new load jobs. Thirty-two application/guard tests and four offline cloud-delivery tests also pass.

The challenger wins validation Brier (0.1968 versus 0.2033), but loses on the held-out test (0.2009 versus 0.1879; lower is better). The test cohort contains 203 mature historically approved applications. This does **not** establish a general accuracy improvement or justify automatic promotion. Rejected-consumer counterfactuals remain explicitly synthetic.

## Delivery boundary

Model computation and orchestration run locally. Cloud Run, GCS, Artifact Registry and a cloud scheduler are not deployed. BigQuery Sandbox tables expire after 60 days; repository artifacts provide durable reproduction. Registry promotion and rollback are automated demonstration fixtures, not production model decisions. No real consumer data or live lending decisions are involved.
