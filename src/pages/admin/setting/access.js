import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Tabs } from 'antd';
import FormOptions from '@/components/Form';

const { TabPane } = Tabs;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

const Access = () => {
  const [form] = Form.useForm();

  const options = [
    {
      type: 'checkbox-group',
      label: '允许新用户注册',
      field: 'bbname',
      extra: '设置是否允许游客注册成为站点会员，您可以根据站点需求选择注册方式\n',
      onItemSelect: [
        {
          value: '2',
          items: [
            {
              type: 'input',
              key: 'bbname',
              label: '关闭注册提示信息',
              field: 'bbname',
              extra: '当站点关闭注册时的提示信息',
              layout,
            },
          ],
        },
      ],
      items: [
        {
          key: '1',
          value: '1',
          content: '开放普通注册'
        },
        {
          key: '2',
          value: '2',
          content: '开放邀请注册',
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
      <Tabs>
        <TabPane tab="注册" key="1">
          <Form form={form} initialValues={{}}>
            <FormOptions options={options} form={form}/>
          </Form>
        </TabPane>
        <TabPane tab="访问控制" key="2">

        </TabPane>
      </Tabs>

    </PageHeaderWrapper>
  )
};

export default Access;
