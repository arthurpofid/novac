import React from 'react';
import { Form, Modal, Select, Input, Descriptions } from 'antd';
import i18n from '@/i18n';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;

  mintCoin: any;
  backedCoin: any;
  amountEstimate: any;
  fee: any;
  estimate: (amount: any) => void;
}

const BorrowForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
  mintCoin,
  backedCoin,
  amountEstimate,
  fee,
  estimate,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title={i18n.t('button_borrow')}
      okText={i18n.t('button_ok')}
      cancelText={i18n.t('button_cancel')}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values: any) => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="amountes"
          label={`${i18n.t('form_lable_amount')}(${backedCoin})`}
          rules={[{ required: true, message: i18n.t('form_input_amount') }]}
          className="collection-create-form_last-form-item"
        >
          <Input
            onBlur={v => {
              estimate(v.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label={i18n.t('form_lable_password')}
          rules={[{ required: true, message: i18n.t('form_input_password') }]}
          className="collection-create-form_last-form-item"
        >
          <Input
            type={'password'}
            onBlur={v => {
              form
                .validateFields()
                .then((values: any) => {
                  estimate(values['amountes']);
                })
                .catch(info => {
                  console.log('Validate Failed:', info);
                });
            }}
          />
        </Form.Item>

        <Descriptions column={1}>
          <Descriptions.Item
            label={`${i18n.t('form_lable_estimate')}(${mintCoin})`}
          >
            {amountEstimate}
          </Descriptions.Item>
          <Descriptions.Item label={`${i18n.t('form_lable_fee')}(${mintCoin})`}>
            {fee}
          </Descriptions.Item>
        </Descriptions>
      </Form>
    </Modal>
  );
};

export default BorrowForm;
