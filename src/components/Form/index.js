import React, { useState } from 'react';
import { Form, Input, Switch, Checkbox, Radio } from 'antd';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 8 },
};


const renderFormInput = fieldOption => {
  const { label, field, message, extra, rules, key, layout, required } = fieldOption;
  const msg = `请输入${label}`;
  return (
    <Form.Item
      {...formItemLayout}
      {...layout}
      label={label}
      extra={extra}
      key={`item-${key || field}`}
      name={field}
      rules={rules || (required && [
        {
          required: true,
          message: message || msg,
        },
      ])}
    >
      <Input placeholder={msg} key={`input-${field}`}/>
    </Form.Item>
  );
};

const renderFormSwitch = (fieldOption, form) => {
  const {
    label, field, message, extra, rules,
    key, onVisibleShow, layout, required
  } = fieldOption;

  const msg = `请输入${label}`;

  return (
    <>
      <Form.Item
        {...formItemLayout}
        {...layout}
        label={label}
        extra={extra}
        key={`item-${key || field}`}
        name={field}
        rules={rules || (required && [
          {
            required: true,
            message: message || msg,
          },
        ])}
      >
        <Switch placeholder={msg} key={`switch-${key || field}`} />
      </Form.Item>
      {
        onVisibleShow && form.getFieldValue(field) &&
        // eslint-disable-next-line no-use-before-define,@typescript-eslint/no-use-before-define
        renderItem(onVisibleShow, form)
      }
    </>
  );
};

const renderFormRadio = (fieldOption, form) => {
  const {
    label, field, message, extra, rules, key,
    onVisibleShow, layout, required, radios, visibleValue
  } = fieldOption;
  const msg = `请选择${label}`;
  const radioDom = <Radio.Group name={field} key={`radio-group-${key || field}`}>
    {
      radios.map(radio => <Radio value={radio.value}
                                 key={`radio-${key || field}-${radio.value}`}>{radio.text}</Radio>)
    }
  </Radio.Group>;
  return (
    <>
      <Form.Item
        {...formItemLayout}
        {...layout}
        label={label}
        extra={extra}
                 key={`item-${key || field}`}
        name={field}
        rules={rules || (required && [
          {
            required: true,
            message: message || msg,
          },
        ])}
      >
        {radioDom}
      </Form.Item>
      {
        onVisibleShow && form.getFieldValue(field) === visibleValue &&
        // eslint-disable-next-line no-use-before-define,@typescript-eslint/no-use-before-define
        renderItem(onVisibleShow, form)
      }
    </>
  );
};

const renderCheckBoxGroup = (fieldOption, form) => {

  const [selectedValue, setSelectedValue] = useState([]);

  const {
    label, field, message, extra, rules,
    key, onItemSelect, items, layout, required
  } = fieldOption;

  const onChange = val => {
    setSelectedValue(val);
  };

  const msg = `请选择${label}`;

  return (
    <>
      <Form.Item
        {...formItemLayout}
        {...layout}
        label={label}
        extra={extra}
        key={`item-${key || field}`}
        name={field}
        valuePropName="checked"
        rules={rules || (required && [
          {
            required: true,
            message: message || msg,
          },
        ])}
      >
        <Checkbox.Group style={{ width: '100%' }} key={`checkbox-group-${key || field}`} onChange={onChange}>
          {
            items && items.map(item => <Checkbox key={`checkbox-${item.key || item.value}`}
                                                 value={item.value}>{item.content}
            </Checkbox>)
          }
        </Checkbox.Group>
      </Form.Item>
      {
        onItemSelect &&
        onItemSelect.map(item =>
            // eslint-disable-next-line no-use-before-define,@typescript-eslint/no-use-before-define
             selectedValue.map(selected => selected === item.value && renderItem(item.items, form))
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
