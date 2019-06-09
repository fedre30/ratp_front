import styled from "styled-components";
import { colors, font } from "styles/const";

export const SidebarContainer = styled.div`
  z-index: 1;
  width: 20%;
  height: 95vh;
  background: linear-gradient(197.74deg, #ffffff 1.38%, #d1e5ec 100%);
  position: absolute;
  left: 0;
  top: 0;
  padding: 2vh 1rem 1rem 1rem;

  .Section-label {
    font-weight: bold;
    font-size: 1.2rem;
    text-transform: uppercase;
    color: ${colors.primary};
    margin-bottom: 2rem;
  }
`;

export const TransportsContainer = styled.div`
  width: 85%;
  margin: 3rem auto;

  .Transport-icons-container {
    display: flex;
    flex-wrap: wrap;
    margin: 1rem 0;
  }

  .Transport-icon {
    width: 3rem;
    margin: 1rem 2rem 1rem 0;
    cursor: pointer;
    img {
      width: 100%;
    }
  }

  .disable {
    opacity: 0.3;
  }
`;

export const FiltersContainer = styled.div`
  width: 90%;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
  
  .Filter-wrapper {
    height: auto;
    display: flex;
    align-items: center;
    cursor: pointer;
    
  }
  
  .Filter-label {
    color: ${colors.primary}
    font-size: 1.2rem;
    font-weight: ${font.weight.bolder};
    margin-bottom: 1rem;
  
  }
 
  
  .Filter-icon {
    width: 4rem;
    height: 4rem;
    padding: 1rem;
    background: ${colors.primary};
    border-radius: 0.2rem;
    margin: 1rem 1.5rem 2rem 0;
  }
  
  .disable {
    background: ${colors.grey};
  }
 
`;
