package com.botmakers.Botmakers.Assignment.mapper;

import com.botmakers.Botmakers.Assignment.dto.UserDto;
import com.botmakers.Botmakers.Assignment.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User user);
}
