---
id: api-logging
title: Logging
---

logging모듈을 리용하여 `quras-js` 내부 로그를 남길수 있습니다.

```js
import {logging} from 'quras-js'
logging.logger.setAll('info') // quras-js의 logger level을 info로 설정합니다.
const apiLogger = logging.logger.getLogger('api') // api모듈에 대한 logger를 얻습니다.
apiLogger.setLevel('warn') // api모듈에 대한 logger level을 warn으로 설정합니다.
```

모든 로그들은 `stdout`와 `stderr`로 출력되게 됩니다.
표준 logger방식은 'slient'방식입니다.