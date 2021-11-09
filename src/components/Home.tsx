import React, { useState, useRef } from "react"
import {
    Button,
    Center,
    Heading,
    Text,
    Icon,
    Input,
    ScaleFade,
    OrderedList,
    Divider,
    ListItem,
    Spinner,
    InputGroup, // Some Chakra components that might be usefull
    HStack,
    VStack,
    InputRightAddon,
    Box,
    Select,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
} from "@chakra-ui/react"
import { Search2Icon, InfoIcon } from '@chakra-ui/icons'
import { Card } from '@components/design/Card'
import { searchSchoolDistricts, searchSchools } from "@utils/nces"
import { Map } from './Map'


const Home: React.FC = () => {
    const [districtSearch, setDistrictSearch] = useState('');
    const [schoolSearch, setSchoolSearch] = useState('');
    const [schoolDistrict, setSchoolDistrict] = useState('');
    const [districtData, setDistrictData] = useState([]);
    const [schoolData, setSchoolData] = useState([]);
    const [showDistList, setShowDistList] = useState(false);
    const [showSchoolList, setShowSchoolList] = useState(false);
    const [showDistFilter, setShowDistFilter] = useState(false);
    const [showSearchHint, setShowSearchHint] = useState(false);
    const [showNoResult, setShowNoResult] = useState(false);

    const handleSchoolSearch = async (schl, district) => {
        const schools = await searchSchools(schl, district);
        setSchoolData(schools);
        setShowSchoolList(true);
        setShowDistList(false);

        if(!schools.length){
            setShowNoResult(true);
        }else{
            setShowNoResult(false);
        }
    };

    const handleDistrictSearch = async (dist) => {
        if(dist.length <= 5){
            setShowSearchHint(true);
            return;
        }

        setShowSearchHint(false);
        const districts = await searchSchoolDistricts(dist);
        setDistrictData(districts);
        setShowDistList(true);
        setShowDistFilter(true);
        setShowSchoolList(false);
        setSchoolSearch('');

        if(!districts.length){
            setShowNoResult(true);
            return;
        }else{
            setShowNoResult(false);
        }

        setSchoolDistrict(districts[0].LEAID);
    };
    console.log("School data", schoolData)


    return (
        <Center bg="tomato" paddingTop="110px" h="100%">
            <ScaleFade initialScale={0.9} in={true} >
                <Heading textAlign="center" >School Data Finder</Heading>
                <InputGroup p="20px" justifyContent="center">
                    <Input
                        type="text"
                        width="350px"
                        placeholder="search school district"
                        borderRadius="20px"
                        onChange={e => setDistrictSearch(e.target.value)}
                    />
                    <InputRightAddon
                        backgroundColor="green"
                        children={<Search2Icon color='white'/>}
                        borderRadius="20px"
                        cursor="pointer"
                        onClick={() => handleDistrictSearch(districtSearch)}
                    />
                </InputGroup>
                {showSearchHint ?
                    <Text
                        textAlign="center"
                        fontSize="sm"
                        paddingBottom="3"
                    >
                        * Input a school district name
                    </Text> : null
                }
                {showDistFilter ?
                    <Card
                        variant="rounded"
                        border="transparent"
                        h="auto"
                        w="250px"
                        zIndex="1"
                        position="absolute"
                        left="10"
                        top="25%"
                    >
                        <Text
                            marginRight="8"
                            fontWeight="bold"
                            fontSize="sm"
                        >
                            Select School District:
                        </Text>
                        <Select
                            value={schoolDistrict}
                            variant="flushed"
                            size="sm"
                            onChange={(e) => setSchoolDistrict(e.target.value)}
                        >
                            {districtData.map((district, idx) =>
                                <option
                                    key={idx}
                                    value={district.LEAID}
                                >
                                    {district.NAME}
                                </option>
                            )}
                        </Select>
                        <Text
                            marginRight="80px"
                            fontWeight="bold"
                            fontSize="sm"
                        >
                            Search school:
                        </Text>
                        <Input
                        type="text"
                        width="100%"
                        value={schoolSearch}
                        onChange={e => setSchoolSearch(e.target.value)}
                        />
                        <Button
                            variant="solid"
                            colorScheme="green"
                            size="md"
                            marginTop="3"
                            onClick={() => handleSchoolSearch(schoolSearch, schoolDistrict)}
                        >
                            Search
                        </Button>
                    </Card>: null
                }
                {showDistList ?
                    <Card variant="rounded" border="transparent" h="auto" w="700px">
                        {showNoResult ?
                            <Text>No search result</Text> : null
                        }
                        {districtData.map((district, idx) =>
                            <Box key={idx} p={3} display={{ md: "flex" }} w="95%" borderBottom='2px'>
                                <Text
                                    fontWeight="bold"
                                    fontSize="lg"
                                    letterSpacing="wide"
                                    color="teal.600"
                                    marginLeft="3%"
                                >
                                    {district.NAME}
                                </Text>
                                <Popover>
                                    <PopoverTrigger>
                                        <Box marginLeft="auto" marginRight="3%">
                                            <ScaleFade initialScale={0.9} in={true} whileHover={{ scale: 1.5 }}>
                                                <InfoIcon color="teal.600" cursor="pointer" w={5} h={5}/>
                                            </ScaleFade>
                                        </Box>
                                    </PopoverTrigger>
                                    <PopoverContent w="auto" h="auto" color="white" bg="blue.800" borderColor="blue.800" fontSize="sm">
                                        <PopoverHeader fontWeight="bold" fontSize="md">{district.NAME}</PopoverHeader>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverBody>
                                            <Text>
                                                Address: {district.LSTREE}, {district.LCITY}, {district.LSTATE} {district.LZIP}-{district.LZIP4}
                                            </Text>
                                            <Text>
                                                County Name: {district.NMCNTY15}
                                            </Text>
                                            <Text>
                                                Agency Identification Number: {district.LEAID}
                                            </Text>
                                            <Text>
                                                State of Operation: {district.OPSTFIPS}
                                            </Text>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Box>
                        )}
                    </Card> : null
                }
                {showSchoolList ?
                    <Card variant="rounded" border="transparent" h="auto" w="700px">
                        {showNoResult ?
                            <Text>No search result</Text> : null
                        }
                        {schoolData.map((school, idx) =>
                            <Box key={idx} p={3} display={{ md: "flex" }} w="95%" borderBottom='2px'>
                                <Text
                                    fontWeight="bold"
                                    fontSize="lg"
                                    letterSpacing="wide"
                                    color="teal.600"
                                    marginLeft="3%"
                                >
                                    {school.NAME}
                                </Text>
                                <Popover>
                                    <PopoverTrigger>
                                        <InfoIcon color="teal.600" marginLeft="auto" marginRight="3%" cursor="pointer"/>
                                    </PopoverTrigger>
                                    <PopoverContent w="auto" h="auto" color="white" bg="blue.800" borderColor="blue.800" fontSize="sm">
                                        <PopoverHeader fontWeight="bold" fontSize="md">{school.NAME}</PopoverHeader>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverBody>
                                            <Text>
                                                Address: {school.STREET}, {school.CITY}, {school.STATE} {school.ZIP}
                                            </Text>
                                            <Text>
                                                County Name: {school.NMCNTY}
                                            </Text>
                                            <Text>
                                                School Year: {school.SCHOOLYEAR}
                                            </Text>
                                            <Text>
                                                Agency Identification Number: {school.LEAID}
                                            </Text>
                                            <Text>
                                                State of Operation: {school.OPSTFIPS}
                                            </Text>
                                            <Box h="150px" w="300px">
                                                <Map geo={school.GEO} />
                                            </Box>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Box>
                        )}
                    </Card> : null
                }
            </ScaleFade>
        </Center>
    );
};

export default Home