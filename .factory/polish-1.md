# Polish round 1

| Findings | Repair | Evidence |
| --- | --- | --- |
| F-1-1, F-1-50 | Landing opens demo with report rendered; replay is optional. | sample-report claim regression. |
| F-1-2 | Demo uses only demo-prefixed session keys; install exit clears them. | demo-private claim regression. |
| F-1-3 | Generated browser fixture runs the real CLI demo and ships its redacted report. | sample-fixture claim regression. |
| F-1-4, F-1-33–35 | Privacy copy was narrowed to observable demo and site behavior. | browser request/storage regression. |
| F-1-5, F-1-7 | Explicit route rewrites, 404 override, metadata, and standalone 404 shell. | route and accessibility regressions. |
| F-1-6 | Back and forward focus the page heading. | keyboard route regression. |
| F-1-8 | Mobile puts copy before art and checks the initial facts. | mobile regression. |
| F-1-9 | Unknown package links say they lead to GitHub until metadata resolves them. | release lookup regression. |
| F-1-10–40 | Broad unverified wording was removed or narrowed; retained claims have one test each. | claims contract regression. |
| F-1-41–49 | Landing and README use direct names for product, watcher, freeze, and report. | copy audit. |

The blueprint visual system and original art remain unchanged.
