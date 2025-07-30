-- hub name
getgenv().namehub = 'Auto Collect - filipp999'

local ui = loadstring(game:HttpGet(""))()

local main = ui.new()
local tabAuto = main:create_tab("Auto", "7734051454")

-- toggle
tabAuto.create_toggle({
    name = 'Auto Harvest V1',
    flag = 'autoharvestv1',
    section = 'left',
    enabled = false,
    callback = function(state)
        if state then
            task.spawn(function()
                local players = game:GetService("Players")
                local player = players.LocalPlayer
                local replicatedStorage = game:GetService("ReplicatedStorage")
                local byteNetReliable = replicatedStorage:WaitForChild("ByteNetReliable")
                local buffer = buffer.fromstring("\1\1\0\1")

                local farm = nil
                for _, f in ipairs(workspace.Farm:GetChildren()) do
                    if f:FindFirstChild("Important") and f.Important:FindFirstChild("Data") and f.Important.Data:FindFirstChild("Owner") then
                        if f.Important.Data.Owner.Value == player.Name then
                            farm = f
                            break
                        end
                    end
                end

                if not farm then
                    warn("Could not find your farm.")
                    ui.Flags['autoharvestv1'] = false
                    return
                end

                while ui.Flags['autoharvestv1'] do
                    local minWeight = ui.Flags['minweight'] or 0
                    local maxWeight = ui.Flags['maxweight'] or 9999
                    local speed = ui.Flags['harvestspeed'] or 0.1

                    local selectedMutations = ui.Flags['mutationselect'] or {}
                    local selectedVariants = ui.Flags['variantselect'] or {}

                    local plantsPhysical = farm.Important:FindFirstChild("Plants_Physical")
                    if not plantsPhysical then
                        warn("Could not find Plants_Physical.")
                        ui.Flags['autoharvestv1'] = false
                        return
                    end

                    for _, plant in ipairs(plantsPhysical:GetChildren()) do
                        if not ui.Flags['autoharvestv1'] then break end

                        local fruitsFolder = plant:FindFirstChild("Fruits")
                        if fruitsFolder then
                            for _, fruit in ipairs(fruitsFolder:GetChildren()) do
                                if not ui.Flags['autoharvestv1'] then break end

                                local variant = fruit:FindFirstChild("Variant") and fruit.Variant.Value or "Normal"
                                if not table.find(selectedVariants, variant) then continue end

                                local w = fruit:FindFirstChild("Weight")
                                local weight = (w and tonumber(w.Value)) or 0
                                if weight < minWeight or weight > maxWeight then continue end

                                local matchesMutation = false
                                for _, mutation in ipairs(selectedMutations) do
                                    if fruit:GetAttribute(mutation) == true then
                                        matchesMutation = true
                                        break
                                    end
                                end

                                if matchesMutation then
                                    byteNetReliable:FireServer(buffer, { fruit })
                                    task.wait(math.max(0.01, speed))
                                end
                            end
                        else
                            -- single harvest
                            local variant = plant:FindFirstChild("Variant") and plant.Variant.Value or "Normal"
                            if not table.find(selectedVariants, variant) then continue end

                            local w = plant:FindFirstChild("Weight")
                            local weight = (w and tonumber(w.Value)) or 0
                            if weight < minWeight or weight > maxWeight then continue end

                            local matchesMutation = false
                            for _, mutation in ipairs(selectedMutations) do
                                if plant:GetAttribute(mutation) == true then
                                    matchesMutation = true
                                    break
                                end
                            end

                            if matchesMutation then
                                byteNetReliable:FireServer(buffer, { plant })
                                task.wait(math.max(0.01, speed))
                            end
                        end
                    end

                    task.wait(speed)
                end
            end)
        end
    end
})

-- mutation multi dropdown
tabAuto.create_multidropdown({
    name = 'Select Mutations',
    flag = 'mutationselect',
    section = 'left',
    option = '',
    options = {
        'Wet', 'Windstruck', 'Moonlit', 'Chilled', 'Choc', 'Pollinated', 'Sandy', 'Clay', 'Verdant',
        'Bloodlit', 'Twisted', 'Drenched', 'HoneyGlazed', 'Cloudtouched', 'Frozen', 'Tempestuous',
        'Ceramic', 'Friendbound', 'Sundried', 'Aurora', 'Shocked', 'Celestial', 'Dawnbound',
        'Burnt', 'Static', 'Amber', 'Cooked', 'Chakra', 'CorruptChakra', 'Tranquil', 'OldAmber',
        'Corrupt', 'Zombified', 'HarmonisedChakra', 'HarmonisedFoxfireChakra', 'AncientAmber',
        'FoxfireChakra', 'CorruptFoxfireChakra', 'Paradisal', 'Disco', 'Heavenly', 'Plasma',
        'Fried', 'Molten', 'Subzero', 'Blitzshock', 'Infected', 'Jackpot', 'Radioactive', 'Alienlike',
        'Galactic', 'Touchdown', 'Meteoric', 'Voidtouched', 'Wiltproof', 'Toxic', 'Eclipsed',
        'Enlightened', 'Cosmic', 'Equinox'
    },
    callback = function() end
})

-- variant multi dropdown
tabAuto.create_multidropdown({
    name = 'Select Variants',
    flag = 'variantselect',
    section = 'left',
    option = '',
    options = {'Normal', 'Gold', 'Rainbow'},
    callback = function() end
})

-- min weight slider
tabAuto.create_slider({
    name = 'Min Weight',
    flag = 'minweight',
    section = 'left',
    value = 0,
    minimum_value = 0,
    maximum_value = 9999,
    callback = function(value) end
})

-- max weight slider
tabAuto.create_slider({
    name = 'Max Weight',
    flag = 'maxweight',
    section = 'left',
    value = 9999,
    minimum_value = 0,
    maximum_value = 9999,
    callback = function(value) end
})

-- harvest speed slider
tabAuto.create_slider({
    name = 'Harvest Speed',
    flag = 'harvestspeed',
    section = 'left',
    value = 0.1,
    minimum_value = 0.01,
    maximum_value = 2,
    callback = function(value) end
})
