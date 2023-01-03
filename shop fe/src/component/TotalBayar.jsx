import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, {Component} from "react";
import { Button, Col, Row } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import { numberWithCommas } from "../utils/utils";

export default class TotalBayar extends Component {
    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.keranjangs
        }

        axios.post(API_URL+"pesanans", pesanan).then((res) => {
            this.props.history.push("/sukses")
        })
    }

  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
        return result + item.total_harga
    }, 0);

    return(
      <>
      {/* web */}
      <div className="fixed-bottom d-none d-md-block">
        <Row>
            <Col md={{span: 3, offset: 9}} className="px-4">
            <h4>Total Harga : <strong className="float-right">Rp. {numberWithCommas(totalBayar)}</strong></h4>

            <Button onClick={() => this.submitTotalBayar(totalBayar)} variant="primary" style={{width: "100%"}} className="mb-3 mt-3 mr-4">
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
            </Button>
            </Col>
        </Row>
      </div>

      {/* mobile */}
      <div className="d-sm-block d-md-none">
        <Row>
            <Col md={{span: 3, offset: 9}} className="px-4 mt-5">
            <h4>Total Harga : <strong className="float-right">Rp. {numberWithCommas(totalBayar)}</strong></h4>

            <Button onClick={() => this.submitTotalBayar(totalBayar)} variant="primary" style={{width: "100%"}} className="mb-3 mt-3 mr-4" to="/sukses">
                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
            </Button>
            </Col>
        </Row>
      </div>
      </>
    )
  }
}