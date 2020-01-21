import React, { Component } from "react";
import CartScrollBar from "./CartScrollBar";
import Counter from "./Counter";
import EmptyCart from "../empty-states/EmptyCart";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { findDOMNode } from "react-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCart: false,
            cart: this.props.cartItems,
            mobileSearch: false
        };
    }
    handleCart(e) {
        e.preventDefault();
        this.setState({
            showCart: !this.state.showCart
        });
    }
    handleSubmit(e) {
        e.preventDefault();
    }
    handleMobileSearch(e) {
        e.preventDefault();
        this.setState({
            mobileSearch: true
        });
    }
    handleSearchNav(e) {
        e.preventDefault();
        this.setState(
            {
                mobileSearch: false
            },
            function() {
                this.refs.searchBox.value = "";
                this.props.handleMobileSearch();
            }
        );
    }
    handleClickOutside(event) {
        const cartNode = findDOMNode(this.refs.cartPreview);
        const buttonNode = findDOMNode(this.refs.cartButton);
        if (cartNode.classList.contains("active")) {
            if (!cartNode || !cartNode.contains(event.target)) {
                this.setState({
                    showCart: false
                });
                event.stopPropagation();
            }
        }
    }
    componentDidMount() {
        document.addEventListener(
            "click",
            this.handleClickOutside.bind(this),
            true
        );
    }
    componentWillUnmount() {
        document.removeEventListener(
            "click",
            this.handleClickOutside.bind(this),
            true
        );
    }
    render() {
        let cartItems;
        cartItems = this.state.cart.map(product => {
            return (
                <li className="cart-item" key={product.name}>
                    <img className="product-image" src={product.image} />
                    <div className="product-info">
                        <p className="product-name">{product.name}</p>
                        <p className="product-price">{product.price} M</p>
                    </div>
                    <div className="product-total">
                        <p className="quantity">
                            {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
                        </p>
                        <p className="amount">{product.quantity * product.price} M</p>
                    </div>
                    <a
                        className="product-remove"
                        href="#"
                        onClick={this.props.removeProduct.bind(this, product.id)}
                    >
                        ×
                    </a>
                </li>
            );
        });
        let view;
        if (cartItems.length <= 0) {
            view = <EmptyCart />;
        } else {
            view = (
                <CSSTransitionGroup
                    transitionName="fadeIn"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    component="ul"
                    className="cart-items"
                >
                    {cartItems}
                </CSSTransitionGroup>
            );
        }
        return (
            <header>
                <div className="container">
                    <div className="brand" style={{color: "#1056ad", fontSize: "30px"}}>
                        Shopping Cart
                    </div>

                    <div className="search">
                        <a
                            className="mobile-search"
                            href="#"
                            onClick={this.handleMobileSearch.bind(this)}
                        >
                            <img
                                src="C://search"
                                alt="search"
                            />
                        </a>
                        <form
                            action="#"
                            method="get"
                            className={
                                this.state.mobileSearch ? "search-form active" : "search-form"
                            }
                        >
                            <a
                                className="back-button"
                                href="#"
                                onClick={this.handleSearchNav.bind(this)}
                            >
                                <img
                                    src="https://res.cloudinary.com/icons/back.png"
                                    alt="back"
                                />
                            </a>
                        </form>
                    </div>

                    <div className="cart">
                        <div className="cart-info">
                            <table>
                                <tbody>
                                <tr>
                                    <td>No. of items</td>
                                    <td>:</td>
                                    <td>
                                        <strong>{this.props.totalItems}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Sub Total</td>
                                    <td>:</td>
                                    <td>
                                        <strong>{this.props.total} M</strong>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <a
                            className="cart-icon"
                            href="#"
                            onClick={this.handleCart.bind(this)}
                            ref="cartButton"
                        >
                            <img
                                className={this.props.cartBounce ? "tada" : " "}
                                src="https://res.cloudinary.com/dza5jiplu/image/upload/c_scale,h_32/v1579560953/shoppingcart.png"
                                alt="Cart"
                            />
                            {this.props.totalItems ? (
                                <span className="cart-count">{this.props.totalItems}</span>
                            ) : (
                                ""
                            )}
                        </a>
                        <div
                            className={
                                this.state.showCart ? "cart-preview active" : "cart-preview"
                            }
                            ref="cartPreview"
                        >
                            <CartScrollBar>{view}</CartScrollBar>
                            <div className="action-block">
                                <button
                                    type="button"
                                    className={this.state.cart.length > 0 ? " " : "disabled"}
                                >
                                    PROCEED TO CHECKOUT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;