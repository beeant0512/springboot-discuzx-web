import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

class Index extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper title={false}>
        <div>index</div>
      </PageHeaderWrapper>
    )
  }
}

export default Index;
