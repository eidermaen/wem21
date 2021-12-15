(module
    (export "ggT" (func $ggT))
    (func $ggT (param $first i32)(param $second i32)(result i32)(local $div i32)
        local.get $first
        i32.eqz
        if
            local.get $second
            return
        end
        local.get $second
        i32.eqz
        if
            local.get $first
            return
        end
        loop $loop
            local.get $first
            local.get $second
            i32.rem_u
            local.set $div
            local.get $second
            local.set $first
            local.get $div
            local.set $second
            local.get $second
            i32.eqz
            if
                local.get $first
                return
            end
            br $loop
        end

        local.get $first
    )
)
