import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class FlowModel {
    @Field(type => String)
    amount: string;
}

@ObjectType()
export class DefectAgeModel {
    @Field(type => String)
    age: string;
}

