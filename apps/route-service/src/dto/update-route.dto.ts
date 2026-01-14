import { PartialType } from '@nestjs/mapped-types';
import { CreateRouteDTO } from './create-route.dto';

export class UpdateRouteDTO extends PartialType(CreateRouteDTO) {}