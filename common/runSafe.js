'use strict';

import {coroutine} from 'bluebird';

const runSafe = (fn) => {
  return coroutine(fn)()
    .catch(e => {
      console.log("Error while running coroutine: ", e, e.stack);
    });
};

export default runSafe
