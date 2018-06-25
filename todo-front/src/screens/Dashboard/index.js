import React from 'react';
import {
    Form, Button,
    Layout, Row, Col,
    List, Avatar, Spin,
    Menu, Card, Tag
} from 'antd';
import axios from 'axios';
import moment from 'moment';

import './style.less';
import ModalTaskForm from '../ModalTaskForm';
import {BASE_URL, KEY_USER_ID} from "../../utils/config";

const FormItem = Form.Item;
const {Header, Content} = Layout;

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingMore: false,
            showLoadingMore: true,
            data: [],
            isTaskFormVisible: false,
            updateIndex: -1
        }
    }

    componentDidMount() {
        this.getData();
    }

    showTaskForm = () => {
        this.setState({
            isTaskFormVisible: true
        });
    };

    hideTaskForm = () => {
        this.setState({
            isTaskFormVisible: false
        });
    };

    getData = () => {
        const userId = localStorage.getItem(KEY_USER_ID);
        axios.get(BASE_URL + "tasks/" + userId).then(this.onSuccess).catch(this.onError);
    };

    signOut = () => {
        localStorage.removeItem(KEY_USER_ID);
        this.props.history.push('/');
    };

    onSuccess = (response) => {
        console.log(response);
        const data = this.state.data.concat(response.data.data.tasks);
        this.setState({
            loading: false,
            data: data,
        });
    };

    onError = (response) => {
        this.setState({
            loading: false
        });
    };

    onLoadMore = () => {
        this.setState({
            loadingMore: true,
        });
        this.getData();
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    showUpdateTaskForm = (task) => {
        this.setState({
            task: task
        });
        this.showTaskForm();
    };

    completeTask = (item, index) => {
        console.log("Complete task", item);
        let data = this.state.data;
        data.splice(index, 1);
        this.setState({
            data: data
        });
        axios.post(BASE_URL + "task/complete/" + item._id).then((response) => {
            console.log(response);
        }).catch((error) => {

        });
    };

    render() {
        const {loading, loadingMore, showLoadingMore, data} = this.state;

        return (
            <Layout>
                <Header>
                    <div className="nav-title">
                        Dashboard
                    </div>
                    <Menu
                        className="nav-menu"
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}>
                        <Menu.Item key="1" onClick={() => {
                            this.signOut()
                        }}>Sign Out</Menu.Item>
                    </Menu>
                </Header>
                <Content>
                    <Row style={{marginTop: '30px'}}>
                        <Col span={18} offset={3}>
                            <Card title="Tasks" extra={
                                <Button onClick={() => {
                                    this.setState({
                                        task: undefined
                                    });
                                    this.showTaskForm();
                                }}>
                                    Add
                                </Button>
                            }>
                                <List
                                    className="task-list"
                                    loading={false}
                                    itemLayout="horizontal"
                                    dataSource={data}
                                    renderItem={(item, index) => (
                                        <List.Item actions={[
                                            <Button onClick={() => {
                                                this.showUpdateTaskForm(item);
                                                this.setState({
                                                    updateIndex: index
                                                });
                                            }}>
                                                edit
                                            </Button>,
                                            <Button onClick={() => {
                                                this.completeTask(item, index);
                                            }}>
                                                Complete
                                            </Button>
                                        ]}>
                                            <List.Item.Meta
                                                title={item.title}
                                                description={item.description}/>
                                            <span style={{width: '100%'}}>
                                            Due Date: {moment(item.end_date).format("MM-DD-YYYY")}
                                            </span>
                                            <span style={{width: '100%'}}>
                                            <Tag>{item.status}</Tag>
                                            </span>
                                            <br/>
                                            <span>
                                            {item.priority === "High" ? (
                                                    <Tag color="red">{item.priority}</Tag>)
                                                : item.priority === "Medium" ? (
                                                    <Tag color="green">{item.priority}</Tag>) : (
                                                    <Tag color="blue">{item.priority}</Tag>)}
                                                    </span>
                                        </List.Item>
                                    )}/>
                            </Card>
                        </Col>
                    </Row>
                </Content>
                <ModalTaskForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.isTaskFormVisible}
                    task={this.state.task}
                    onHide={(tasks) => {
                        if (tasks.length > 0) {
                            console.log("on hide", tasks);
                            let data = this.state.data;
                            if (this.state.updateIndex !== -1) {
                                data.splice(this.state.updateIndex, 1);
                                this.setState({
                                    data: data.concat(tasks),
                                    updateIndex: -1
                                });
                            } else {
                                this.setState({
                                    data: data.concat(tasks)
                                });
                            }
                        }
                        this.hideTaskForm();
                    }}/>
            </Layout>
        );
    }
}

export default Dashboard;