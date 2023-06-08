import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAuthorDto {
    @ApiProperty({ example: 'Tommy' })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ example: 'Grullon' })
    @IsString()
    @IsNotEmpty()
    last_name: string;
}
