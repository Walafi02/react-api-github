import styled from 'styled-components';

export const Container = styled.div`
  color: black;
  font-weight: bold;
`;

export const Loading = styled.div`
  color: #fff;
  font-size: 35px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /**altura total da tela */
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none; /**Remove o anderline */
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
    max-width: 400;
  }
`;

export const IssuesList = styled.ul`
  /* padding-top: 20px; */
  margin-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
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

        span {
          background: #eee;
          color: #333;
          border-radius: 3px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 10px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 8px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;

  button {
    margin: 15px;
    border: none;
    font-size: 25px;
    background: transparent;
    color: #7159c1;
    border-radius: 3px;

    &:hover {
      background: #eee;
    }

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }

    svg {
      margin: auto;
    }
  }

  span {
    font-size: 22px;
  }
`;

export const Search = styled.div`
  display: flex;
  justify-content: flex-end;

  span {
    align-self: center;
    font-size: 18px;
    color: #666;
  }

  select {
    cursor: pointer;
    border-radius: 3px;
    padding: 5px;
    margin: 5px;
    color: #666;
    -webkit-appearance: none;

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;
