import React from "react";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import {Resource} from "../../../interfaces/Resource";
import ResourceNode from "../../ResourceNode";
import Button from '@mui/material/Button';

// TODO get nodes from api
const resources: Resource[] = [
  {
    "provider": "aws",
    "type": "VPC",
    "description": "Amazon Virtual Private Cloud (Amazon VPC) enables you to launch AWS resources into a virtual network that you've defined. This virtual network closely resembles a traditional network that you'd operate in your own data center, with the benefits of using the scalable infrastructure of AWS.",
    "arguments": [
      {
        "type": "string",
        "name": "tenancy",
        "defaultValue": "default",
        "values": [],
        "min": null,
        "max": null
      },
      {
        "type": "string",
        "name": "cidr",
        "defaultValue": "10.0.0.0/24",
        "values": [],
        "min": null,
        "max": "15"
      },
      {
        "type": "string",
        "name": "pub_subnet",
        "defaultValue": "10.0.0.128/26",
        "values": [],
        "min": null,
        "max": "15"
      },
      {
        "type": "string",
        "name": "prv_subnet",
        "defaultValue": "10.0.0.192/26",
        "values": [],
        "min": null,
        "max": "15"
      }
    ]
  },
  {
    "provider": "aws",
    "type": "S3",
    "description": "Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance. Customers of all sizes and industries can use Amazon S3 to store and protect any amount of data for a range of use cases, such as data lakes, websites, mobile applications, backup and restore, archive, enterprise applications, IoT devices, and big data analytics. Amazon S3 provides management features so that you can optimize, organize, and configure access to your data to meet your specific business, organizational, and compliance requirements.",
    "arguments": [
      {
        "type": "string",
        "name": "acl",
        "defaultValue": "private",
        "values": [],
        "min": null,
        "max": null
      }
    ]
  },
  {
    "provider": "aws",
    "type": "EC2",
    "description": "Amazon Elastic Compute Cloud (Amazon EC2) is a web service that provides resizable computing capacity—literally, servers in Amazon's data centers—that you use to build and host your software systems.",
    "arguments": [
      {
        "type": "string",
        "name": "ami",
        "defaultValue": "ami-052efd3df9dad4825",
        "values": [],
        "min": null,
        "max": null
      },
      {
        "type": "select",
        "name": "type",
        "defaultValue": "t2.micro",
        "values": [
          "t2.nano",
          "t2.micro",
          "t2.small",
          "t2.medium",
          "t2.large",
          "t2.xlarge",
          "t2.2xlarge"
        ],
        "min": null,
        "max": null
      },
      {
        "type": "bool",
        "name": "public_ip",
        "defaultValue": true,
        "values": [],
        "min": null,
        "max": null
      }
    ]
  },
  {
    "provider": "aws",
    "type": "RDS",
    "description": "Amazon Relational Database Service (Amazon RDS) is a web service that makes it easier to set up, operate, and scale a relational database in the cloud. It provides cost-efficient, resizable capacity for an industry-standard relational database and manages common database administration tasks.",
    "arguments": [
      {
        "type": "string",
        "name": "ami",
        "defaultValue": "ami-052efd3df9dad4825",
        "values": [],
        "min": null,
        "max": null
      },
      {
        "type": "select",
        "name": "type",
        "defaultValue": "db.t3.micro",
        "values": [
          "db.t3.nano",
          "db.t3.micro",
          "db.t3.small",
          "db.t3.medium",
          "db.t3.large",
          "db.t3.xlarge",
          "db.t3.2xlarge"
        ],
        "min": null,
        "max": null
      },
      {
        "type": "select",
        "name": "engine",
        "defaultValue": "mysql",
        "values": [
          "mysql",
          "postgres",
          "sqlserver-ex",
          "oracle-ee"
        ],
        "min": null,
        "max": null
      },
      {
        "type": "string",
        "name": "version",
        "defaultValue": null,
        "values": [],
        "min": null,
        "max": null
      },
      {
        "type": "string",
        "name": "family",
        "defaultValue": null,
        "values": [],
        "min": null,
        "max": null
      },
      {
        "type": "string",
        "name": "username",
        "defaultValue": null,
        "values": [],
        "min": null,
        "max": null
      },
      {
        "type": "string",
        "name": "password",
        "defaultValue": null,
        "values": [],
        "min": null,
        "max": null
      },
      {
        "type": "bool",
        "name": "publicly_accessible",
        "defaultValue": false,
        "values": [],
        "min": null,
        "max": null
      },
      {
        "type": "bool",
        "name": "skip_final_snapshot",
        "defaultValue": true,
        "values": [],
        "min": null,
        "max": null
      }
    ]
  },
  {
    "provider": "aws",
    "type": "SQS",
    "description": "Amazon Simple Queue Service (Amazon SQS) is a fully managed message queuing service that makes it easy to decouple and scale microservices, distributed systems, and serverless applications. Amazon SQS moves data between distributed application components and helps you decouple these components.",
    "arguments": [
      {
        "type": "number",
        "name": "delay_seconds",
        "defaultValue": 90,
        "values": [],
        "min": null,
        "max": null
      },
      {
        "type": "number",
        "name": "max_message_size",
        "defaultValue": 2048,
        "values": [],
        "min": null,
        "max": "2049"
      },
      {
        "type": "number",
        "name": "message_retention_seconds",
        "defaultValue": 86400,
        "values": [],
        "min": null,
        "max": null
      },
      {
        "type": "number",
        "name": "receive_wait_time_seconds",
        "defaultValue": 10,
        "values": [],
        "min": null,
        "max": null
      }
    ]
  }
]

const ResourceList = () => {
  const onDragStart = (event: any, nodeType: any, resource: Resource) => {

    event.dataTransfer.setData("application/reactflow", JSON.stringify({
      type: nodeType,
      resource: resource
    }));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <Stack direction="row" spacing={1}>
        {resources.map((resource: Resource, index: number) => (
            <div onDragStart={(event) => onDragStart(event, "ResourceNode", resource)} key={index} draggable>
              <Button style={{color: "orange"}} variant="text">{resource.type}</Button>
            </div>
        ))}
      </Stack>
    </aside>
  );
};

export default ResourceList;
