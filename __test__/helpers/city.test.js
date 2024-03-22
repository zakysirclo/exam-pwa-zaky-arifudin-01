import { groupingCity, groupingSubCity } from '@helpers/city';

const sampleData = [{
    city: 'Asahan, Aek Kuasan, Aek Loba',
    country_id: 'ID',
    id: 43945,
    postcode: '21273',
    region_code: 'ID-SU',
    region_id: 600,
}];
const expectedCity = [{
    city: 'Asahan, Aek Kuasan, Aek Loba',
    id: 43945,
    label: 'Asahan',
    name: 'Asahan',
    postcode: '21273',
}];
const expectedDistrict = [{
    city: 'Asahan, Aek Kuasan, Aek Loba',
    id: 43945,
    label: 'Aek Kuasan',
    name: 'Aek Kuasan',
    parent: 'Asahan',
    postcode: '21273',
}];
const expectedVillage = [{
    city: 'Asahan, Aek Kuasan, Aek Loba',
    id: 43945,
    label: 'Aek Loba',
    name: 'Aek Loba',
    parent: 'Aek Kuasan',
    postcode: '21273',
}];
describe('City Helper', () => {
    it('Should return a city with label', () => {
        expect(groupingCity(sampleData)).toMatchObject(expectedCity);
    });
    it('Should return a district based on parent city', () => {
        expect(groupingSubCity('Asahan', 'district', sampleData)).toMatchObject(expectedDistrict);
    });
    it('Should return a village based on district and parent city', () => {
        expect(groupingSubCity('Aek Kuasan', 'village', sampleData, expectedCity[0])).toMatchObject(expectedVillage);
    });
});
