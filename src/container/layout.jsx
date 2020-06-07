import React from 'react';
import { RouteWithSubRoutes } from '@/router';
export default function layout({ routes }) {
  return (
    <div>
      123
      <RouteWithSubRoutes routes={routes} />
    </div>
  );
}
