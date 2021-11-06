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
    InputRightAddon
} from "@chakra-ui/react"
import { Search2Icon } from '@chakra-ui/icons'
import { Card } from '@components/design/Card'
import { searchSchoolDistricts, searchSchools, NCESDistrictFeatureAttributes, NCESSchoolFeatureAttributes } from "@utils/nces"


const Home: React.FC = () => {
    const [districtSearch, setDistrictSearch] = useState('')
    const [schoolSearch, setSchoolSearch] = useState('')
    const [districtData, setDistrictData] = useState<NCESDistrictFeatureAttributes[]>([]);
    const [schoolData, setSchoolData] = useState<NCESSchoolFeatureAttributes[]>([]);

    const demo = async () => { // see console for api result examples

        const demoDistrictSearch = await searchSchoolDistricts("Peninsula School District")
        setDistrictSearch(demoDistrictSearch)

        const demoSchoolSearch = await searchSchools("m", demoDistrictSearch[1].LEAID)
        setSchoolSearch(demoSchoolSearch)
        console.log("School Example", demoSchoolSearch)

    }


    const handleDistrictSearch = async (dist) => {
            const districts = await searchSchoolDistricts(dist)
            setDistrictData(districts)
    }
    console.log("District example", districtData)

    return (
        <Center bg="tomato" padding="100px" height="auto">
            <ScaleFade initialScale={0.9} in={true}>
                <Card variant="rounded" borderColor="blue" height="auto">
                    <Heading>School Data Finder</Heading>
                    <InputGroup>
                        <Input type="text"
                            width="500px"
                            placeholder="search school district"
                            borderRadius="20px"
                            onChange={e => setDistrictSearch(e.target.value)}
                        />
                        <InputRightAddon
                            backgroundColor="green"
                            children={<Search2Icon color='white'/>}
                            borderRadius="20px"
                            onClick={() => handleDistrictSearch(districtSearch)}
                        />
                    </InputGroup>
                    {/* <Text>
                        How would you utilize React.useEffect with the searchSchoolDistricts and searchSchools functions? <br />
                        Using <a href="https://chakra-ui.com/docs/principles" target="_blank">Chakra-UI</a> or your favorite UI toolkit, build an interface that allows the user to: <br />
                        <OrderedList>
                            <ListItem>Search for a district</ListItem>
                            <ListItem>Search for a school within the district (or bypass district filter)</ListItem>
                            <ListItem>View all returned data in an organized way</ListItem>
                        </OrderedList>
                    </Text>
                    <Divider margin={4} />
                    <Text>
                        Check the console for example of returned data. <b>Happy coding!</b>< br />
                        {searching ? <Spinner /> : <></>}< br />
                        {districtSearch.length} Demo Districts<br />
                        {schoolSearch.length} Demo Schools<br />
                    </Text> */}
                </Card>
            </ScaleFade>
        </Center>
    );
};

export default Home