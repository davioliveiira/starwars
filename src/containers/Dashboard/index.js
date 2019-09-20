import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators } from '../../store/ducks/Dashboard';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Button,
} from 'reactstrap';
import { capitalize, sizeObject } from '../../services/utils';
import Details from './components/Details';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      showDetails: false,
    };
  }

  componentDidMount() {
    const { readDashboard } = this.props;
    const { page } = this.state;
    readDashboard({ page });
  }

  details = (people) => {
    const { setCurrentDashboard } = this.props;
    setCurrentDashboard(people);
    this.setState({
      showDetails: true,
    });
  }

  closeDetails = () => {
    const { setCurrentDashboard } = this.props;
    setCurrentDashboard({});
    this.setState({
      showDetails: false,
    });
  }

  paginate = (direction) => {
    const { readDashboard } = this.props;
    const { page } = this.state;
    const setPage = direction === 'next' ? (page + 1) : (page - 1);

    this.setState({
      page: setPage
    });

    readDashboard({ page: setPage });
  }

  render() {
    const { people, loading, current } = this.props;
    const { showDetails } = this.state;
    return (
      <>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <div className="d-flex align-items-center mb-4">
              <h2>People <span className="font-weight-bold">({people.count})</span></h2>
            </div>
            <Row className="justify-content-center">
              {people.count > 0 && (
                people.results.map((p, index) => (
                  <Col md={4} lg={4} className="mb-4" key={`people_${index}`}>
                    <Card onClick={() => this.details(p)} className="pointer">
                      <CardBody>
                        <CardText className="font-weight-bold">
                          <span className="point" style={{ backgroundColor: p.eye_color }}></span>
                          {p.name}
                        </CardText>
                        <div className="d-flex">
                          <small className="text-muted">
                            <i className="eva eva-person-outline"></i> {p.gender === 'n/a' ? '-' : capitalize(p.gender)}
                          </small>
                          <small className="text-muted ml-auto">
                            <strong>Starships:</strong> {p.starships.length}
                          </small>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
            <div className="mt-5 text-center">
              <Button disabled={!people.previous} color="secondary" className="mx-2" onClick={() => this.paginate('prev')}>
                Previus Page
              </Button>
              <Button disabled={!people.next} color="secondary" className="mx-2" onClick={() => this.paginate('next')}>
                Next Page
              </Button>
            </div>
            {sizeObject(current) > 0 && (<Details open={showDetails} toggled={() => this.closeDetails()} />)}
          </>
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...Creators
}, dispatch);

export default connect(state => ({
  people: state.Dashboard.data,
  loading: state.Dashboard.loading.read,
  current: state.Dashboard.current,
}), mapDispatchToProps)(Dashboard);
