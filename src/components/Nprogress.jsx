import 'nprogress/nprogress.css';
import React, { useEffect } from 'react';
import nprogress from 'nprogress';
function Nprogress() {
  nprogress.start();
  useEffect(() => {
    nprogress.done();
  });
  return <React.Fragment />;
}
export default Nprogress;
