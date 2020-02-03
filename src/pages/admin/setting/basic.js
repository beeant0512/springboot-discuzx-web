import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Form, Button } from 'antd';
import { connect } from 'dva';
import FormOptions from '@/components/Form';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@connect(({ setting, loading }) => ({
  setting,
  loading: loading.effects['setting/basic'],
}))
@Form.create()
class Basic extends PureComponent {
  state = {
    values: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'setting/basic',
      callback: data => {
        this.setState({
          values: data,
        })
      },
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'setting/save',
          payload: values,
          callback: response => {
            console.log(response);
          },
        })
      }
    });
  };

  render() {
    const { form } = this.props;
    const { values } = this.state;
    const { getFieldsError } = form;
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
    };
    const options = [
      {
        type: 'input',
        key: 'bbname',
        label: '站点名称',
        value: values.bbname,
        field: 'bbname',
        extra: '站点名称，将显示在浏览器窗口标题等位置',
        layout,
      },
      {
        label: '网站名称',
        value: values.sitename,
        field: 'sitename',
        extra: '网站名称，将显示在页面底部的联系方式处',
        layout,
      },
      {
        label: '网站 URL',
        value: values.siteurl,
        field: 'siteurl',
        extra: '网站 URL，将作为链接显示在页面底部',
        layout,
      },
      {
        label: '管理员邮箱',
        value: values.adminemail,
        field: 'adminemail',
        extra: '管理员 E-mail，将作为系统发邮件的时候的发件人地址',
        layout,
      },
      {
        label: 'QQ在线客服号码',
        value: values.site_qq,
        field: 'site_qq',
        extra: '设置我的QQ在线状态',
        layout,
      },
      {
        label: '网站备案信息代码',
        value: values.icp,
        field: 'icp',
        extra: '页面底部可以显示 ICP 备案信息，如果网站已备案，在此输入您的授权码，它将显示在页面底部，如果没有请留空',
        layout,
      },
      {
        type: 'radio',
        label: '显示授权信息链接',
        value: values.boardlicensed,
        field: 'boardlicensed',
        extra: '选择“是”将在页脚显示商业授权用户链接，链接将指向 Discuz! 官方网站，用户可通过此链接验证其所使用的 Discuz! 是否经过商业授权',
        radios: [
          { value: '0', text: '否' },
          { value: '1', text: '是' },
        ],
        layout,
      },
      {
        type: 'radio',
        label: '关闭站点',
        value: values.bbclosed,
        field: 'bbclosed',
        extra: '暂时将站点关闭，其他人无法访问，但不影响管理员访问',
        layout,
        radios: [
          { value: '0', text: '否' },
          { value: '1', text: '是' },
        ],
        visibleValue: '1',
        onVisibleShow: [
          {
            label: '关闭站点的原因',
            value: values.closedreason,
            field: 'closedreason',
            extra: '站点关闭时出现的提示信息',
            layout,
          },
          {
            type: 'radio',
            label: '站点关闭时允许 UCenter 中的用户激活',
            value: values.closedallowactivation,
            field: 'closedallowactivation',
            layout,
            radios: [
              { value: '0', text: '否' },
              { value: '1', text: '是' },
            ],
          },
        ],
      },
    ];
    return (
      <PageHeaderWrapper title={false}>
        <Form onSubmit={this.handleSubmit}>
          <FormOptions options={options} form={form}/>
          <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </PageHeaderWrapper>
    )
  }
}

export default Basic;
