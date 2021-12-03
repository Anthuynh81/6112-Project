import Axios from 'axios';
import renderer from "react-test-renderer";
import individaulVaccineBarChart from "./individaulVaccineBarChart";
import IndividualVaccineBarChart from "./individaulVaccineBarChart";


async function getValue() {
    const response = await Axios.get("http://localhost:5000/Vaccine")
    return response
}

test("Get request", async () => {
    const response = await getValue()
    //Success code for get request
    expect(response.status).toEqual(200)
})

test("Getting correct data", async () => {
    const response = await getValue()
    // Should return USA vaccination information
    expect(response.data.Code).toBe("USA")
    // Should be empty as it should have no county information
    expect(response.data.Entity).toBe("United States")
})

test('returns the line chart when called', () => {
    const component = renderer.create(
        <IndividualVaccineBarChart />
    );
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot();
})
