import React from 'react';
import {
    Form, Icon,
    Input, Button,
    Layout
} from 'antd';
import axios from 'axios';

import './style.less';
import {BASE_URL, KEY_USER_ID} from "../../utils/config";

const FormItem = Form.Item;
const {Content} = Layout;

class Login extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post(BASE_URL + "user/login", {
                    email: values.email
                }).then(this.onSuccess).catch(this.onError);
            }
        });
    };

    onSuccess = (response) => {
        console.log(response);
        localStorage.setItem(KEY_USER_ID, response.data.data.user._id);
        this.props.history.push('/dashboard');
    };

    onError = (response) => {
        console.log(response);
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Layout>
                <Content>
                    <div className="login-container">
                        <h4 className="login-title">Login</h4>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('email', {
                                    rules: [{required: true, message: 'Please input your email!'}],
                                })(
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="email"/>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                    Log in
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default Form.create()(Login);