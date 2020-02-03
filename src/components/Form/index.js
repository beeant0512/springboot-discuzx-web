import React from 'react';
import { Form, Input, Switch, Checkbox, Radio } from 'antd';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 8 },
};

const renderFormInput = (fieldOption, form) => {
  const { label, field, message, extra, rules, key, value, layout, required } = fieldOption;
  const { getFieldDecorator } = form;
  const msg = `请输入${label}`;
  return (
    <Form.Item {...formItemLayout} {...layout} label={label} extra={extra} key={`item-${key || field}`}>
      {getFieldDecorator(field, {
        initialValue: value,
        rules: rules || (required && [
          {
            required: true,
            message: message || msg,
          },
        ]),
      })(<Input placeholder={msg} key={`input-${field}`}/>)}
    </Form.Item>
  );
};

const renderFormSwitch = (fieldOption, form) => {
  const { label, field, message, extra, rules, value,
    key, onVisibleShow, layout, required } = fieldOption;
  const { getFieldDecorator, getFieldValue } = form;
  const msg = `请输入${label}`;

  return (
    <>
      <Form.Item {...formItemLayout} {...layout} label={label} extra={extra} key={`item-${key || field}`}>
        {getFieldDecorator(field, {
          initialValue: value || false,
          valuePropName: 'checked',
          rules: rules || (required && [
            {
              required: true,
              message: message || msg,
            },
          ]),
        })(<Switch placeholder={msg} key={`switch-${key || field}`}/>)}
      </Form.Item>
      {
        onVisibleShow && getFieldValue(field) &&
        // eslint-disable-next-line no-use-before-define,@typescript-eslint/no-use-before-define
        renderItem(onVisibleShow, form)
      }
    </>
  );
};

const renderFormRadio = (fieldOption, form) => {
  const { label, field, message, extra, rules, value, key,
    onVisibleShow, layout, required, radios, visibleValue } = fieldOption;
  const { getFieldDecorator, getFieldValue } = form;
  const msg = `请选择${label}`;
  const radioDom = <Radio.Group name={field} key={`radio-group-${key || field}`}>
    {
      radios.map(radio => <Radio value={radio.value} key={`radio-${key || field}-${radio.value}`}>{radio.text}</Radio>)
    }
  </Radio.Group>;
  return (
    <>
      <Form.Item {...formItemLayout} {...layout} label={label} extra={extra} key={`item-${key || field}`}>
        {getFieldDecorator(field, {
          initialValue: value,
          rules: rules || (required && [
            {
              required: true,
              message: message || msg,
            },
          ]),
        })(radioDom)}
      </Form.Item>
      {
        onVisibleShow && getFieldValue(field) === visibleValue &&
        // eslint-disable-next-line no-use-before-define,@typescript-eslint/no-use-before-define
        renderItem(onVisibleShow, form)
      }
    </>
  );
};

const renderCheckBoxGroup = (fieldOption, form) => {
  const { label, field, message, extra, rules,
    value, key, onItemSelect, items, layout, required } = fieldOption;
  const { getFieldDecorator, getFieldValue } = form;
  const msg = `请选择${label}`;
  const selectedValue = getFieldValue(field);
  return (
    <>
      <Form.Item {...formItemLayout} {...layout} label={label} extra={extra} key={`item-${key || field}`}>
        {getFieldDecorator(field, {
          initialValue: value,
          valuePropName: 'checked',
          rules: rules || (required && [
            {
              required: true,
              message: message || msg,
            },
          ]),
        })(<Checkbox.Group style={{ width: '100%' }} key={`checkbox-group-${key || field}`}>
          {
            items && items.map(item => <Checkbox key={`checkbox-${item.key || item.value}`}
                                                 value={item.value}>{item.content}
            </Checkbox>)
          }
        </Checkbox.Group>)}
      </Form.Item>
      {
        selectedValue && onItemSelect &&
        onItemSelect.map(item =>
          // eslint-disable-next-line no-use-before-define,@typescript-eslint/no-use-before-define
          selectedValue && selectedValue.indexOf(item.value) >= 0 && renderItem(item.items, form),
        )
      }
    </>
  );
};

const renderItem = (options, form) => {
  const fields = options.map(item => {
    switch (item.type) {
      case 'switch':
        return renderFormSwitch(item, form);
      case 'radio':
        return renderFormRadio(item, form);
      case 'checkbox-group':
        return renderCheckBoxGroup(item, form);
      default:
        return renderFormInput(item, form);
    }
  });
  return (
    <>
      {
        fields
      }
    </>
  )
};

const ConfigFrom = props => {
  const { options, form } = props;
  return renderItem(options, form);
};


export default ConfigFrom;
