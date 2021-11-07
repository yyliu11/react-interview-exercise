import React, { useEffect, useState } from "react"
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
    Select
} from "@chakra-ui/react"
import { Search2Icon, InfoIcon } from '@chakra-ui/icons'
import { Card } from '@components/design/Card'
import { searchSchoolDistricts, searchSchools, NCESDistrictFeatureAttributes, NCESSchoolFeatureAttributes } from "@utils/nces"


const Home: React.FC = () => {
    const [districtSearch, setDistrictSearch] = useState('')
    const [schoolSearch, setSchoolSearch] = useState('')
    const [schoolDistrict, setSchoolDistrict] = useState('')
    const [districtData, setDistrictData] = useState<NCESDistrictFeatureAttributes[]>([]);
    const [schoolData, setSchoolData] = useState<NCESSchoolFeatureAttributes[]>([]);
    const [showResult, setShowResult] = useState(false);

    const handleSchoolSearch = async (schl, district) => {
        const schools = await searchSchools(schl, district)
        setSchoolData(schools)
    }


    const handleDistrictSearch = async (dist) => {
            const districts = await searchSchoolDistricts(dist);
            setDistrictData(districts);
            setShowResult(true);
            setSchoolDistrict(districts[0].LEAID)
    }
    console.log("searchSchool", schoolData)


    return (
        <Center bg="tomato" p="110px" h="100%">
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
                {showResult ?
                    <Card
                        variant="rounded"
                        border="transparent"
                        h="auto"
                        w="250px"
                        zIndex="1"
                        position="absolute"
                        right="10"
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
                        onChange={e => setSchoolSearch(e.target.value)}
                        />
                        <Button
                            bg="green"
                            variant="solid" c
                            olorScheme="orange"
                            size="md"
                            marginTop="3"
                            onClick={() => handleSchoolSearch(schoolSearch, schoolDistrict)}
                        >
                            Search
                        </Button>
                    </Card>: null
                }
                {showResult ?
                    <Card variant="rounded" border="transparent" h="auto" w="700px">
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
                                <InfoIcon color="teal.600" marginLeft="auto" marginRight="3%" cursor="pointer"/>
                            </Box>
                        )}
                    </Card> : null
                }
            </ScaleFade>
        </Center>
    );
};

export default Home