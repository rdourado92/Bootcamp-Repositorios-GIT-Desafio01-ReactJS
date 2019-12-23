import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 20px;
  margin-top: 10px;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const IssueSpan = styled.span`
  background: ${props => `#${props.color}`};
  color: #333;
  border-radius: 2px;
  font-size: 12px;
  font-weight: 600;
  height: 20px;
  padding: 3px 4px;
  margin-left: 10px;
`;

export const Issues = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  border-top: 1px solid #eee;
  padding-top: 30px;

  div {
    display: flex;
    justify-content: space-between;

    button {
      margin-top: 10px;
      color: #7159c1;
      background: transparent;
      border: none;
      &:hover {
        color: #ccc;
      }
      &:disabled {
        color: #ccc;
        cursor: auto;
      }
    }
  }

  select {
    border: 1px solid #eee;
    border-radius: 4px;
    background: #fff;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    width: 150px;
  }

  span > select {
    width: 60px;
    margin-right: 5px;
  }
`;

export const LoadingIssues = styled.p`
  font-size: 24px;
  text-align: center;
`;
