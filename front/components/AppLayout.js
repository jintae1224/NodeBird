import Link from "next/link";
import { Col, Input, Menu, Row } from "antd";
import { useState } from "react";

import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";

const AppLayout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div>
      <div>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link href="/">
              <a>노드버드</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/profile">
              <a>프로필</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Input.Search enterButton style={{ verticalAlign: "middle" }} />
          </Menu.Item>
          <Menu.Item>
            <Link href="/signup">
              <a>회원가입</a>
            </Link>
          </Menu.Item>
        </Menu>
        <Row gutter={8}>
          {/* gutter : 간격(컬럼간의) */}
          <Col xs={24} md={6}>
            {/* xs : 모바일, sm : 태블릿, md : 작은 데스크 탑 */}
            {isLoggedIn ? <UserProfile /> : <LoginForm />}
          </Col>
          <Col xs={24} md={12}>
            {children}
          </Col>
          <Col xs={24} md={6}>
            <a
              href="https://www.zerocho.com"
              target="_blank"
              rel="norereferrer noopener"
            >
              Made by Zerocho
            </a>
            {/* target="_blank" 새창에서 열기 -> 보안문제로 rel="norereferrer noopener" 추가 */}
          </Col>
          {/* 모바일 : 100%짜리 3개 stack
                    데스크 탑 : 25% 하나, 50%하나, 25%gksk */}
        </Row>
      </div>
    </div>
  );
};

export default AppLayout;
