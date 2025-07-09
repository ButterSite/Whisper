import { HeaderStyled, HeaderDivStyled, StyledLink } from "./styles"

const Header = () => {
    return (
        <HeaderStyled>
        <HeaderDivStyled>
          <StyledLink to={'/'}>
            <p><b>Home</b></p>
          </StyledLink>
          <StyledLink to={'/chat'}>
            <p><b>Chat</b></p>
          </StyledLink>

        </HeaderDivStyled>
      </HeaderStyled>
    )
}


export default Header