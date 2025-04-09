import React, { useEffect, useState } from "react";
import { Input, Select, Card, Row, Col, Button } from "antd";
import "./Home.css";
import { CompanyVacancyStore } from "../../stores/CompanyVacansies";
import { Link } from "react-router-dom";

const { Search } = Input;
const { Option } = Select;

function Home() {
  const { getAllVacansiesForUsers, allVacansies, searchVacancyByPosition } =
    CompanyVacancyStore();
  const [filters, setFilters] = useState({
    level: "",
  });
  const [searchText, setSearchText] = useState("");
  const [filteredVacancies, setFilteredVacancies] = useState([]);

  useEffect(() => {
    getAllVacansiesForUsers();
  }, []);

  useEffect(() => {
    let result = allVacansies;

    if (searchText) {
      result = result.filter((v) =>
        v.position.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filters.level) {
      result = result.filter((v) => v.level === filters.level);
    }

    setFilteredVacancies(result);
  }, [allVacansies, searchText, filters]);

  const handleSearch = (value) => {
    setSearchText(value);
    searchVacancyByPosition(value);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="home-container">
      <div className="search-section">
        <Search
          placeholder="Vakansiya nomi bo'yicha qidirish"
          allowClear
          enterButton="Qidirish"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          style={{ marginBottom: 20 }}
        />
      </div>

      <Row gutter={16}>
        {/* Filters column */}
        <Col xs={24} sm={8} md={6} lg={4}>
          <div className="filters-section">
            <h3>Filterlar</h3>

            <div className="filter-group">
              <label>Darajasi</label>
              <Select
                style={{ width: "100%" }}
                placeholder="Barcha darajalar"
                onChange={(value) => handleFilterChange("level", value)}
                allowClear
              >
                <Option value="Junior">Junior</Option>
                <Option value="Middle">Middle</Option>
                <Option value="Senior">Senior</Option>
              </Select>
            </div>

            <Button
              type="default"
              onClick={() =>
                setFilters({
                  level: "",
                })
              }
              style={{ marginTop: 10 }}
            >
              Filterlarni tozalash
            </Button>
          </div>
        </Col>

        {/* Vacancies list column */}
        <Col xs={24} sm={16} md={18} lg={20}>
          <div className="vacancies-list">
            <h2>Topilgan vakansiyalar: {filteredVacancies.length}</h2>

            <Row gutter={[16, 16]}>
              {filteredVacancies.map((vacancy) => (
                <Col key={vacancy.id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    title={vacancy.position}
                    bordered={false}
                    className="vacancy-card"
                  >
                    <p>
                      <strong>Darajasi:</strong> {vacancy.level}
                    </p>
                    <p>
                      <strong>Ish vaqti:</strong> {vacancy.work_start_hour} -{" "}
                      {vacancy.work_end_hour}
                    </p>
                    <p>
                      <strong>Talablar:</strong>
                    </p>
                    <ul>
                      {vacancy.hard_requirements.slice(0, 3).map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                    <Link to={"/getOneVacancy?id=" + vacancy?.id} block>
                      Batafsil
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
