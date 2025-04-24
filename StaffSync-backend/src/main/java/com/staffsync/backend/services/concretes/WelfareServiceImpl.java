package com.staffsync.backend.services.concretes;

import com.staffsync.backend.entities.concretes.Welfare;
import com.staffsync.backend.entities.dtos.WelfareDto;
import com.staffsync.backend.repositories.WelfareRepository;
import com.staffsync.backend.result.*;
import com.staffsync.backend.services.abstracts.WelfareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WelfareServiceImpl implements WelfareService {

    private final WelfareRepository welfareRepository;

    @Autowired
    public WelfareServiceImpl(WelfareRepository welfareRepository) {
        this.welfareRepository = welfareRepository;
    }

    @Override
    public Result addWelfare(WelfareDto welfareDto) {
        Welfare welfare = welfareDto.toEntity();
        welfareRepository.save(welfare);
        return new SuccessResult("Added Welfare...");
    }

    @Override
    public DataResult<WelfareDto> getWelfareById(int welfareId) {
        Optional<Welfare> opt = welfareRepository.findById(welfareId);

        if(opt.isPresent()) {
            return new SuccessDataResult<>(WelfareDto.fromEntity(opt.get()), "Found Welfare...");
        }

        return new ErrorDataResult<>("Could not find Welfare");
    }

    @Override
    public DataResult<List<WelfareDto>> getWelfareByEmployeeId(int id) {
        return new SuccessDataResult<>(
                welfareRepository.findAllByEmployeeId(id)
                        .stream()
                        .map(WelfareDto::fromEntity)
                        .collect(Collectors.toList())
        );
    }

    @Override
    public DataResult<List<WelfareDto>> getAllWelfare() {
        return new SuccessDataResult<>(
                welfareRepository.findAll()
                        .stream()
                        .map(WelfareDto::fromEntity)
                        .collect(Collectors.toList())
        );
    }
}
