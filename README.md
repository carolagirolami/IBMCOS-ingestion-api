# REST Application to ingest and search HL7 documents on IBM Cloud Object Storage 

## Overview
Create REST api to ingest and retrieve stored HL7 documents in a simple Node.js application that uses the IBM Object Storage service available on IBM Cloud and deploy it on top of the container orchestration platform Kubernetes. Documents are parsed and validated using an external cloud function: hl7parsercloudfunction. Two types of searches are available, one by keys and one by metadata using the IBM SQL Query service.  


## Flow


# Steps

1.## [Create and configure an Cloud Object Storage service instance]
2.## [Create a SQL Query service instance]
3.## [Build and publish hl7parser cloud function]
4.## [Build and publish SQL cloud function]

### 1. Create and configure an Cloud Object Storage service instance
Sign up for an IBM Cloud account. Once registered, add an [IBM Cloud Object Storage service](https://console.bluemix.net/catalog/services/cloud-object-storage). 

In the IBM Cloud Object Storage UI:

- create 2 buckets (these are "folders" where uploaded files will be kept): called metadata.net and data.net
- create a set of credentials. Make a note of the API endpoint and API key for the next step.

### 2. Create a SQL Query service instance

 Follow instructions to create an [SQLQuery instance] (https://console.bluemix.net/docs/services/sql-query/getting-started.html#getting-started-tutorial)

### 3. Build and publish hl7parser cloud function
Follow instructions for [hl7-parser-cloud-function](https://github.com/AnnalisaChiacchi/hl7-parser-cloud-function)

### 4. Build and publish SQL cloud function
Follow instructions for [sqlcloudfunction] (https://github.com/IBM-Cloud/sql-query-clients/tree/master/Python/cloud_function)


## Run locally
1. [Clone the repo](#1-clone-the-repo)
2. [Run the application](#2-run-the-application)

### 1. Clone the repo

Clone the repo locally. In a terminal, run:

```
$ git clone https://github.com/IBM/deploy-react-kubernetes
```

### 2. Run the application
1. Install [Node.js](https://nodejs.org/en/)
2. Run the following commands in a terminal: 

```
$ npm install

$ npm run build-css

$ npm run start
```

Verify app is running and working correctly.

## Run the application using Docker
1. [Build the image](#1-build-the-image)
2. [Run the image](#2-run-the-image)

## Prerequisites:
1. [Create Docker account](https://cloud.docker.com/)
 
2. [Install Docker CLI](https://docs.docker.com/install/)

3. [Retrieve and save your Docker user id](https://cloud.docker.com/)

### 1. Build the image

In a terminal, run:
```
$ docker build -t $docker_username/deploy-react-kubernetes .
```

Your image should be listed by running:

```
$ docker images
```

### 2. Run the image

In a terminal, run:

```
$ docker run -p 3000:3000 -d $docker_username/deploy-react-kubernetes
```

You can now access the application at http://localhost:3000

## Run the application on Kubernetes

1. [Build image.](#1-build-image)
2. [Deploy the application](#2-deploy-the-application)

## Prerequisites
1. [Create an account with IBM Cloud](https://console.bluemix.net/registration/)

2. [Install IBM Cloud CLI](https://console.bluemix.net/docs/cli/reference/bluemix_cli/get_started.html#getting-started)

3. Log into your IBM Cloud account
```
bx login 
```

If you have a federated ID, use bx login --sso to log in to the IBM Cloud CLI.

4. Install the Container Registry plug-in.
```
bx plugin install container-registry -r Bluemix
```

5. Install the Container Service plug-in.
```
bx plugin install IBM-Containers -r Bluemix
```

6. [Install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl)

7. Create cluster
```
bx cs cluster-create --name YOUR_CLUSTER_NAME
```

8. Configure Kubernetes cluster
```
$ bx cs cluster-config YOUR_CLUSTER_NAME
```

Copy and paste response in CLI

9. Choose a name for your first namespace, and create that namespace. Use this namespace for the rest of the Quick Start.
```
$ bx cr namespace-add YOUR_NAMESPACE
```


### 1. Build image

Build image in the IBM Container Registry: 
```
$ bx cr build -t registry.<ibm_cloud_region>.bluemix.net/<your_namespace>/deploy-react-kubernetes .
```

### 2. Deploy the application

``` 
$ kubectl run deploy-react-kubernetes-deployment —-image=registry.<ibm_cloud_region>.bluemix.net/<your_namespace>/deploy-react-kubernetes
```

To check how many pods are running on Kubernetes run the command: 
```
kubectl get pods
```

Expose the app to the web by setting the port. Run the command:

```
$ kubectl expose deployment/deploy-react-kubernetes-deployment 
—-type=NodePort —-name=deploy-react-kubernetes-service —-port=3000
```

* To access your application. You would need the public IP address of your cluster and NodePort of the service.

```
# For clusters provisioned with IBM Cloud
$ bx cs workers YOUR_CLUSTER_NAME
```

```
# For details on a specific Kubernetes service
$ kubectl describe service deploy-react-kubernetes-service
```

You can now access the application at http://IP_ADDRESS:NODE_PORT

## Run the application on Kubernetes with a yaml file

Note: Follow the prerequisites in 'Run the application on Kubernetes section' before executing command below. 

```
kubectl create -f deployment.yaml
```
# Links

# Learn more

# License

[Apache 2.0](LICENSE)