package com.staffsync.backend.services.abstracts;

import com.staffsync.backend.entities.dtos.WelfareDto;
import com.staffsync.backend.result.DataResult;
import com.staffsync.backend.result.Result;

import java.util.List;

public interface WelfareService {

    Result addWelfare(WelfareDto welfare);

    // Result updateWelfare(WelfareDto welfare);

    // Result deleteWelfare(int welfareId);

    DataResult<WelfareDto> getWelfareById(int welfareId);

    DataResult<List<WelfareDto>> getWelfareByEmployeeId(int welfareId);

    DataResult<List<WelfareDto>> getAllWelfare();

}
