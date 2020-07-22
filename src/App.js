import React,{useState, useEffect} from 'react';
import debounce from "lodash/debounce";
import filter from "lodash/filter";
import axios from 'axios';
import { useLocation } from "react-router";
import queryString from "query-string";
import {WrapperDiv,Input,List,ListWrapper,ListUl,Icon,NoResult} from './styles';

const App=(props)=> {

  const [searchBoxValue,setSearchBoxValue] = useState('');
  const [unModifiedNameList,setUnModifiedNameList] = useState(null);
  const [nameSuggestionList,setNameSuggestionList] = useState(null);
  const location = useLocation();


  useEffect(()=>{
    fetchNameList();
  },[])


  const fetchNameList =()=>{
      axios.get("https://run.mocky.io/v3/a3fb87d6-f5bf-43d6-ab7f-71467417922e") 
      .then(function (response) {
        //can be replaced with useReducer
        setUnModifiedNameList(response.data.user);
        setNameSuggestionList(response.data.user);
        
        //used for search using query params
        if(location.search){
          let searchParam = queryString.parse(location.search);
          setSearchBoxValue(searchParam.search);
          filterName(searchParam.search,response.data.user);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }



  const handleSearchBoxValueChange = (e) => {
    setSearchBoxValue(e.target.value)

    if(e.target.value){
      filterName(e.target.value);
    }
    else{
     setNameSuggestionList(unModifiedNameList); //reset the suggestion list to initial value if the search values are cleared
     props.history.push(`/`) //for clearing the search params
    }
  }

  const handleKeyPress = (e) => {
    if(e.key==='Enter'){
     handleOnClick(e.target.value);
    }
  }

  const handleOnClick = (name)=>{
    props.history.push(`/?search=${name}`)
  }

  //Filter related functions

  const filterName = debounce((value,initialNameList=null) => {
    const finalNameResults = searchNamesInList(value,initialNameList);
    setNameSuggestionList(finalNameResults);
  }, 400);

  /* @param initialNameList is sent to the function since setUnModifiedNameList works asynchronously */

  const searchNamesInList = (value,initialNameList)=>{
    if (value) {
      const filteredData = filter(unModifiedNameList?unModifiedNameList:initialNameList, eachResult => eachResult.name.toLowerCase().includes(value.toLowerCase()));
      return filteredData;
    }
    return [];
  }

  return (
   <WrapperDiv>
     
     <Input
      name="searchBox"
      placeholder="Search"
      value = { searchBoxValue }
      onChange = { handleSearchBoxValueChange }
      onKeyPress ={ handleKeyPress }
      autoComplete="off"
     />
     <Icon>
      <i class="fa fa-search" aria-hidden="true"></i>
      </Icon>
     <ListWrapper>
      <ListUl>
      {nameSuggestionList && 
       nameSuggestionList.map((eachName,index)=>{
            return(
              index<10 && <List onClick={()=>handleOnClick(eachName.name)} key={ eachName.id }>{ eachName.name }</List>
            )
          })}
        </ListUl>
      </ListWrapper>
      {nameSuggestionList && !nameSuggestionList.length && <NoResult>No results found !</NoResult>}
   </WrapperDiv>
  );
}

export default App;
