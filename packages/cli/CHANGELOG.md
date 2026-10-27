# openlint 1.0.0 (2026-10-23)


### Bug Fixes

* added scarf ([#2980](https://github.com/openlint/openlint/issues/2980)) ([9db5703](https://github.com/openlint/openlint/commit/9db570316d3de899be2dcd8835e95d1817e49997))
* **cli:** add path to JUnit testcase name ([#2029](https://github.com/openlint/openlint/issues/2029)) ([062ae0c](https://github.com/openlint/openlint/commit/062ae0c8b48534c554ac41a23edafb0fbe6aa1b3))
* **cli:** choose proxy agent based on requester protocol ([#2521](https://github.com/openlint/openlint/issues/2521)) ([056f2e1](https://github.com/openlint/openlint/commit/056f2e1eef966b807734fb00aae071411feabe75))
* **cli:** clarify usage of --format ([#2575](https://github.com/openlint/openlint/issues/2575)) ([96eee89](https://github.com/openlint/openlint/commit/96eee89d3210931b8ffeffe44c44d7e9f610c0b0))
* **cli:** correctly handle special characters in JUnit failure details ([#2028](https://github.com/openlint/openlint/issues/2028)) ([cabd2a9](https://github.com/openlint/openlint/commit/cabd2a9a7e81057c3006558add071fd80662827c))
* **cli:** do not show 'or higher' if severity equals error ([#2172](https://github.com/openlint/openlint/issues/2172)) ([f31ec63](https://github.com/openlint/openlint/commit/f31ec636c912f3c9a53672e87a13ad724921b902))
* **cli:** fix bug where output gets truncated when too long ([#2862](https://github.com/openlint/openlint/issues/2862)) ([0e6fd33](https://github.com/openlint/openlint/commit/0e6fd335f42214045f3c08b3106125f5155d4b97))
* **cli:** look for rulesets package next to installation dir ([1f4d8d5](https://github.com/openlint/openlint/commit/1f4d8d5e79f20f635b74c260e1e18afe8265481b))
* **cli:** missing line break ([#2251](https://github.com/openlint/openlint/issues/2251)) ([d16bf9a](https://github.com/openlint/openlint/commit/d16bf9a2d7bb28932f0ea0ef58b786dc8f471ff1))
* **cli:** output to stdout not working with multiple output formatters ([#2044](https://github.com/openlint/openlint/issues/2044)) ([77dfe3b](https://github.com/openlint/openlint/commit/77dfe3b5237a25928febfcf5696eaea5b1edc54f))
* **cli:** peer dependency incorrectly met ([#2268](https://github.com/openlint/openlint/issues/2268)) ([1b70398](https://github.com/openlint/openlint/commit/1b70398c8ff1d033ba971c9f41f3694203ff7b29))
* **cli:** throw error if no file found to lint ([#2778](https://github.com/openlint/openlint/issues/2778)) ([3e20072](https://github.com/openlint/openlint/commit/3e20072de5849a1372eb242cf71783d4d8503b20))
* **cli:** update all prod dependencies ([963a162](https://github.com/openlint/openlint/commit/963a16251ed9d85032f6452d72f5cf5370bb34e0))
* **cli:** update dependencies and trigger docker release ([c87eacf](https://github.com/openlint/openlint/commit/c87eacff7c6d97ec139cc66623e4b0b27158a0cc))
* **core:** fix 'resolved vs unresolved' json path mapping ([#2202](https://github.com/openlint/openlint/issues/2202)) ([157ec59](https://github.com/openlint/openlint/commit/157ec592d8b3276094284fead7a08541b3f46f61))
* **deps:** bump spectral-core dependents ([#2742](https://github.com/openlint/openlint/issues/2742)) ([30c0349](https://github.com/openlint/openlint/commit/30c0349d0ca143cadb029661ffcc919b66f8fd49))
* **deps:** fix package.json ([0161072](https://github.com/openlint/openlint/commit/016107250f88420d224d798c327910faed250d36))
* **deps:** update spectral-core in cli ([35687cd](https://github.com/openlint/openlint/commit/35687cd4bba4411e716a947984d17806a4784763))
* format md file ([#3027](https://github.com/openlint/openlint/issues/3027)) ([39d522a](https://github.com/openlint/openlint/commit/39d522aed60eaa7aed27f11c0a7c0ad0466c5833))
* relax deps ([ca55521](https://github.com/openlint/openlint/commit/ca555210b7c50229c6f8cd0ae9e4e83dedb15083))
* **repo:** require new 0.1.0 for core and cli ([150b928](https://github.com/openlint/openlint/commit/150b92826ef8729ed9c294c80299ba797b4db910))
* updates cli readme ([#2998](https://github.com/openlint/openlint/issues/2998)) ([dbcb26e](https://github.com/openlint/openlint/commit/dbcb26e18b2c5cc04eeea6a121b151ec75787704))


### Features

* **cli:** add sarif formatter ([#2532](https://github.com/openlint/openlint/issues/2532)) ([959a86a](https://github.com/openlint/openlint/commit/959a86aedbc0bfe2533212dcaa4e28784fc1e384))
* **cli:** demand some ruleset to be present ([#1699](https://github.com/openlint/openlint/issues/1699)) ([3baba29](https://github.com/openlint/openlint/commit/3baba292bd4f318b88299d6de9b75d021b508ace))
* **cli:** implement --stdin-filepath flag ([#1712](https://github.com/openlint/openlint/issues/1712)) ([45b15a2](https://github.com/openlint/openlint/commit/45b15a2c81561adb8db755b569360ccdf825c97e))
* **cli:** improve error logging ([#2071](https://github.com/openlint/openlint/issues/2071)) ([b194368](https://github.com/openlint/openlint/commit/b194368164d92dce31b7ceba84ccc94fbe51f979))
* **cli:** integrate ruleset-bundler ([#1824](https://github.com/openlint/openlint/issues/1824)) ([26284c7](https://github.com/openlint/openlint/commit/26284c7004d3b1d7c3ec2bd59910b66bfb3bd414))
* **cli:** require new stoplight dependencies ([#2726](https://github.com/openlint/openlint/issues/2726)) ([8a736b5](https://github.com/openlint/openlint/commit/8a736b557a441e578c498df5af4cf5313c6dc2d5))
* **cli:** require newer version of all Spectral dependencies ([10ddd97](https://github.com/openlint/openlint/commit/10ddd97b6609a58c3542dccf4019488095b38064))
* **cli:** sort linting results alphabetically ([#2147](https://github.com/openlint/openlint/issues/2147)) ([84d48cf](https://github.com/openlint/openlint/commit/84d48cf5e02780f0cbb9ae9074c03a618c2bc462))
* **cli:** support multiple formats and outputs at once ([#2037](https://github.com/openlint/openlint/issues/2037)) ([e7b5816](https://github.com/openlint/openlint/commit/e7b5816e6cfa28814f7cadeeb0c834d43758485e))
* **cli:** use Content-Type header to detect ruleset format ([#2272](https://github.com/openlint/openlint/issues/2272)) ([b4c3c11](https://github.com/openlint/openlint/commit/b4c3c113abe155dc7537432741bbe1a1641d694a))
* **cli:** use hpagent ([#2513](https://github.com/openlint/openlint/issues/2513)) ([9b2d347](https://github.com/openlint/openlint/commit/9b2d3476996f7763c035380beffd2bf46c6051f9))
* **core:** add documentUrl to JS api and cli formatters ([#2443](https://github.com/openlint/openlint/issues/2443)) ([e787728](https://github.com/openlint/openlint/commit/e78772809b5b1fd5fa143d383c3eae957112e134))
* **core:** add error line number for yaml and json ruleset validation ([#2945](https://github.com/openlint/openlint/issues/2945)) ([04c1db3](https://github.com/openlint/openlint/commit/04c1db355f05db33ca22f546bbe80f5b28fb8e4b))
* **core:** improve validation ([#2026](https://github.com/openlint/openlint/issues/2026)) ([8315162](https://github.com/openlint/openlint/commit/83151628824592117d842a8965c9557841966b1a))
* **core:** support overrides in rulesets ([#1684](https://github.com/openlint/openlint/issues/1684)) ([153d685](https://github.com/openlint/openlint/commit/153d68557da4bcffd6d2ed2261bcdb6a8324cdb5))
* **core:** use double quotes in errors reported by Ajv ([#1718](https://github.com/openlint/openlint/issues/1718)) ([dd2a166](https://github.com/openlint/openlint/commit/dd2a166eff5e11c830d44f33bfc928e06a5c33f7))
* **formatters:** add code climate (GitLab) formatter ([#2648](https://github.com/openlint/openlint/issues/2648)) ([41eca61](https://github.com/openlint/openlint/commit/41eca612d292520142ace3bd97cde630c33366f1))
* **formatters:** add markdown formatter ([#2662](https://github.com/openlint/openlint/issues/2662)) ([b5edf5e](https://github.com/openlint/openlint/commit/b5edf5e9b61c986097e6d77988489ed12a48611f))
* **formatters:** move formatters to a separate package ([#2468](https://github.com/openlint/openlint/issues/2468)) ([664e259](https://github.com/openlint/openlint/commit/664e25927f31ca24beebecf78ac373668328de23))
* **parsers:** initial release ([#1739](https://github.com/openlint/openlint/issues/1739)) ([42064b0](https://github.com/openlint/openlint/commit/42064b04887616e863f2da27cd19b4cdcc35c0a3))
* **repo:** minor release trigger ([#3079](https://github.com/openlint/openlint/issues/3079)) ([eabafec](https://github.com/openlint/openlint/commit/eabafec22729529074aba1b392043c9f22a995a3))
* **ruleset-migrator:** implement ruleset migrator  ([#1698](https://github.com/openlint/openlint/issues/1698)) ([efa5c50](https://github.com/openlint/openlint/commit/efa5c50ace565df089707a5196643d52cc82bad6))
* **ruleset-migrator:** inline external rulesets & support exceptions  ([#1711](https://github.com/openlint/openlint/issues/1711)) ([2a1d2d3](https://github.com/openlint/openlint/commit/2a1d2d3696b54bc009ec7f020185a88c32391c56))
* **rulesets:** initial rulesets for the Arazzo Specification ([#2672](https://github.com/openlint/openlint/issues/2672)) ([8443232](https://github.com/openlint/openlint/commit/84432325cd9eb87c4ce32897bd4a23e83aabb856))
* **rulesets:** more consistent messages in OAS ruleset ([#1713](https://github.com/openlint/openlint/issues/1713)) ([2899777](https://github.com/openlint/openlint/commit/2899777c2bfb2eb0bbfacfa9bea7a0fcbe144be9))


### Dependencies

* **@openlint/openlint-formatters:** upgraded to 0.0.2

## @openlint/openlint-cli [0.0.2](https://github.com/openlint/openlint/compare/@openlint/openlint-cli@0.0.1...@openlint/openlint-cli@0.0.2) (2026-10-23)


### Bug Fixes

* **repo:** require new 0.1.0 for core and cli ([150b928](https://github.com/openlint/openlint/commit/150b92826ef8729ed9c294c80299ba797b4db910))
