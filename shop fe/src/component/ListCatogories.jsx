import React, { Component } from "react";
import { Col, ListGroup, ListGroupItem } from "react-bootstrap";
import axios from 'axios';
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTshirt, faShoePrints } from "@fortawesome/free-solid-svg-icons";

const Icon = ({nama}) => {
    if(nama == "Baju") return <FontAwesomeIcon icon={faTshirt} className="mr-2" />
    if(nama == "Jaket") return <FontAwesomeIcon icon={faTshirt} className="mr-2" />
    if(nama == "Sepatu") return <FontAwesomeIcon icon={faShoePrints} className="mr-2" />

    return <FontAwesomeIcon icon={faTshirt} className="mr-2" />
}

export default class ListCategories extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios.get(API_URL + "categories")
          .then(res => {
            const categories = res.data;
            this.setState({ categories });
          })
          .catch(error => {
            console.log(error)
          })
      }

    render() {
        const {categories} = this.state
        const {changeCategory, categoriSelect} = this.props
        return (
            <Col md={2} className="mt-3">
                <h4><strong>List Kategori</strong></h4>
                <hr />
                <ListGroup>
                    {categories && categories.map((category) => (
                        <ListGroup.Item                   
                            key={category.id}
                            onClick={() => changeCategory(category.nama)}
                            className={categoriSelect === category.nama && "category-aktif"}
                            style={{cursor:"pointer"}}
                        >

                            <h6><Icon nama={category.nama}/>{" "}{category.nama}</h6>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        )
    }
}