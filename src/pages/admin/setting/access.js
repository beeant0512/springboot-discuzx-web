import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form } from 'antd';
import FormOptions from '@/components/Form';

@Form.create()
class Access extends PureComponent {
  render() {
    const { form } = this.props;
    const options = [
      {
        type: 'checkbox-group',
        label: '允许新用户注册',
        field: 'bbname',
        extra: '设置是否允许游客注册成为站点会员，您可以根据站点需求选择注册方式\n',
        items: [
          { key: '1', value: '1', content: '开放普通注册' },
          { key: '2', value: '2', content: '开放邀请注册' },
        ],
        onItemSelect: [
          { value: '1',
            items: [
            ],
          },
        ],
      },
      {
        label: '关闭注册提示信息',
        value: 'setting.closedreason',
        field: 'closedreason',
        extra: '当站点关闭注册时的提示信息',
      },
    ];
    return (
      <PageHeaderWrapper title={false}>
        <Form>
          <FormOptions options={options} form={form}/>
        </Form>
      </PageHeaderWrapper>
    )
  }
}

export default Access;
