import { Construct } from "constructs";
import { Stack, StackProps, App } from "aws-cdk-lib";
//import { ApiGatewayToLambda } from "@aws-solutions-constructs/aws-apigateway-lambda";
import * as lambda from "aws-cdk-lib/aws-lambda";
import {
  CognitoToApiGatewayToLambda,
  CognitoToApiGatewayToLambdaProps,
} from "@aws-solutions-constructs/aws-cognito-apigateway-lambda";

export class IacStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // new ApiGatewayToLambda(this, "ApiGatewayToLambdaPattern", {
    //   lambdaFunctionProps: {
    //     runtime: lambda.Runtime.NODEJS_18_X,
    //     handler: "hello.handler",
    //     code: lambda.Code.fromAsset(`lambda`),
    //   },
    // });

    // Module for Cognito -> Api Gateway -> Lambda
    const cognitoToApiGatewayToLambdaProps: CognitoToApiGatewayToLambdaProps = {
      lambdaFunctionProps: {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: "hello.handler",
        code: lambda.Code.fromAsset(`lambda`),
      },
      apiGatewayProps: {
        proxy: false,
      },
    };

    const apigwConstruct = new CognitoToApiGatewayToLambda(
      this,
      "CognitoToApiGatewayToLambdaPattern",
      cognitoToApiGatewayToLambdaProps
    );

    const resource = apigwConstruct.apiGateway.root.addResource("hello");
    resource.addMethod("POST");

    apigwConstruct.addAuthorizers();
  }
}
