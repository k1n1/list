const db = require("../index");
const collection = db.db("drive11").collection("citizen");

const getUserList = (searchQuary, sort, limit, filter, skip) =>
  collection
    .aggregate([
      {
        $match: filter,
      },
      {
        $addFields: {
          fullName: {
            $concat: ["$firstName", " ", "$lastName"],
          },
        },
      },
      {
        $project: {
          _id: 0,
          firstName: 0,
          lastName: 0,
        },
      },
      {
        $sort: sort,
      },
      {
        $lookup: {
          from: "hospital",
          localField: "lastHospitalCode",
          foreignField: "hospitalCode",
          as: "hospitalData",
        },
      },
      {
        $unwind: {
          path: "$hospitalData",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          hospitalName: "$hospitalData.name",
        },
      },

      {
        $match: {
          $or: searchQuary,
        },
      },
      {
        $facet: {
          list: [
            {
              $lookup: {
                from: "vaccinationsData",
                localField: "vaccinations.code",
                foreignField: "code",
                as: "vaccinations",
              },
            },
            {
              $project: {
                hospitalData: 0,
                address: 0,
                "vaccinations._id": 0,
                "vaccinations.totalVac": 0,
              },
            },
            { $skip: skip },
            {
              $limit: limit,
            },
          ],
          total: [{ $count: "count" }],
        },
      },
    ])
    .toArray();

module.exports = { getUserList };

// ! pipline to convet string in to date
// ! only ISO string support
// {
//     $project:{
//         date : {
//             $dateFromString : {
//                 dateString: "$vaccinations.date",
//                 timezone: "America/New Yourk",
//                 onError:"$vaccinations.date"
//                 }
//             }
//         }
//     }
