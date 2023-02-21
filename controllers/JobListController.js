const { default: axios } = require("axios");

const xios = require("axios").default;
// `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?description=${description}&location=${location}&full_time=${full_time}`

const JobList = async (req, res) => {
	const { description, location, full_time, page } = req.body;
	try {
		const jobList = await axios({
			url: "http://dev3.dansmultipro.co.id/api/recruitment/positions.json",
			method: "get",
			params: {
				description: description,
				location: location,
				full_time: full_time,
				page: page,
			},
		});
		// console.log(jobList);
		res.status(200).json({ data: jobList.data });
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: error });
	}
};
// 32bf67e5-4971-47ce-985c-44b6b3860cdb
const JobDetail = async (req, res) => {
	const id = req.params.id;

	try {
		const jobDetail = await axios.get(
			"http://dev3.dansmultipro.co.id/api/recruitment/positions/32bf67e5-4971-47ce-985c-44b6b3860cdb"
		);

		res.status(200).json({ data: jobDetail.data });
	} catch (error) {
		res.status(400).json({ msg: error });
	}
};

module.exports = { JobList, JobDetail };
