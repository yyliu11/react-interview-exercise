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
    const [districtData, setDistrictData] = useState<NCESDistrictFeatureAttributes[]>([]);
    const [schoolData, setSchoolData] = useState<NCESSchoolFeatureAttributes[]>([]);
    const [showResult, setShowResult] = useState(false);

    const demo = async () => { // see console for api result example
        const demoSchoolSearch = await searchSchools("m", demoDistrictSearch[1].LEAID)
        setSchoolSearch(demoSchoolSearch)
        console.log("School Example", demoSchoolSearch)
    }


    const handleDistrictSearch = async (dist) => {
            const districts = await searchSchoolDistricts(dist);
            setDistrictData(districts);
            setShowResult(true);
    }
    console.log("District example", districtData)

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
                        h="200px"
                        w="250px"
                        zIndex="1"
                        position="absolute"
                        right="10"
                        top="25%"
                    >
                        <Select defaultValue={districtData[0].NAME} >
                            {districtData.map((district, idx) =>
                                <option key={idx} value={district.NAME}>{district.NAME}</option>
                            )}
                        </Select>
                    </Card>: null
                }
                {showResult ?
                    <Card variant="rounded" border="transparent" h="auto" w="700px">
                        {districtData.map((district, idx) =>
                            <Box key={idx} p={3} display={{ md: "flex" }} w="95%" borderBottom='2px'>
                                <Text
                                    fontWeight="bold"
                                    fontSize="sm"
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