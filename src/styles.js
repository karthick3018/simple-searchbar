import styled from "@emotion/styled"

export const WrapperDiv = styled.div`
    max-width: 800px;
    margin: 100px auto; 
    width:100%100%; 
    position:relative;
`

export const Input = styled.input`
  max-width: 800px;
  width:100%;
  padding:10px;
  border-radius: 14px 14px 0 0;
  font-size: 20px;
  &:focus {
    outline: none;
}
`

export const Icon = styled.span`
 position:absolute;
 right: 0px;
 top: 5px;
 font-size: 30px;
`


export const ListWrapper = styled.div`
  position:relative;  
`


export const ListUl = styled.ul`
 border:2px solid;
 border-radius: 0 0 14px 14px;
 margin:0;
 padding:0 10px;
 position:absolute;
 max-width: 800px;
 width:100%;
 list-style: none;
`

export const List = styled.li`
      width:100%;
      margin: 20px 0px;
      font-size: 20px;
      padding:5px 0px 5px 5px;
      &:hover {
      cursor:pointer;
      background-color: lightgray;
    }
`

export const NoResult = styled.p`
 text-align:center;
 color:red;
`