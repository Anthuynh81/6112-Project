import Axios from 'axios';
import renderer from "react-test-renderer";
import deathLineChart from "./deathLineChart";

const testDate = "03/14/2020"


async function getValue() {
    const response = await Axios.get("http://localhost:5000/USA")
    return response
}

test("Get request", async () => {
    const response = await getValue()
    //Success code for get request
    expect(response.status).toEqual(200)
})

test("Getting correct data", async () => {
    const response = await getValue()
    // Should be empty as it should have no state information
    expect(response.data[0].AdminRegion1).toBe("")
    // Should be empty as it should have no county information
    expect(response.data[0].AdminRegion2).toBe("\r")
})

test('returns the line chart when called', () => {
    const component = renderer.create(
        <deathLineChart />
    );
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot();
})
