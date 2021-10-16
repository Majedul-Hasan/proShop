import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import Loader from "../components/Loader";
import Message from "../components/ErrorAlerat";

import { listOrders } from "../redux/actions/orderAction";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <th>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i
                      className='fas fa-times d-flex my-auto justify-content-center align-items-center'
                      style={{ color: "red" }}></i>
                  )}
                </th>
                <th>
                  {order.isDelivered ? (
                    <i
                      className='fas fa-check d-flex my-auto justify-content-center align-items-center'
                      style={{ color: "green" }}></i>
                  ) : (
                    <i
                      className='fas fa-times d-flex my-auto justify-content-center align-items-center'
                      style={{ color: "red" }}></i>
                  )}
                </th>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn-sm btn-light '> details</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrderListScreen;
