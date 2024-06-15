import React, { useState, useEffect, lazy } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../src/Api/apiClient'
const FormInput = lazy(() => import('./components/inputs'));
const QAList = lazy(() => import('./components/Q&A'));
const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await apiClient.get('/api/questions');
                setData(res.data);
            } catch (error) {
                console.error('Failed to fetch questions', error);
            }
        };
        fetchQuestions();
    }, [data]);

    const addItem = async (newQuestion) => {
        try {
            const res = await apiClient.post('/api/questions', newQuestion);
            setData([...data, res.data.data]);
        } catch (error) {
            console.error('Failed to add question', error);
        }
    };

    const notify = (message, type) => {
        if (type === "Error") toast.error(message);
        else if (type === "Success") toast.success(message);
    };

    return (
        <div className="font text-center color-body">
            <Container className="p-3">
                <div className="container">
                    <div className="animation-container">
                        <span className="letter" id="letter-m">M</span>
                        <span className="letter" id="letter-e">E</span>
                        <span className="letter" id="letter-r">R</span>
                        <span className="letter" id="letter-n">N</span>
                    </div>
                    <h1>{data.length} MERN Stack Interview Q&A</h1>
                    <Row className="justify-content-center">
                        <Col sm="12">
                            <FormInput onAdd={addItem} notify={notify} />
                            <QAList data={data} />
                        </Col>
                    </Row>
                    <ToastContainer />



                </div>
            </Container>
            <div className="footer">
                        made by <span class="heart">❤️</span> <span class="reem-kufi-fun"> أحمد  صلاح </span>
                    </div>
        </div>
    );
};

export default App;
