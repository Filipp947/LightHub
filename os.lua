-- hub name
getgenv().namehub = 'Example'

local ui = loadstring(game:HttpGet("you are not getting the ui lil cro"))()

local main = ui.new()
local tab = main:create_tab("Auto", "7734051454")

tab.create_title({
    name = 'Auto Buy',
    section = 'left'
})

local player = game:GetService("Players").LocalPlayer
local shopFrame = player.PlayerGui:WaitForChild("Seed_Shop").Frame.ScrollingFrame

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local BuySeedStock = ReplicatedStorage.GameEvents.BuySeedStock

local itemData = {}

for _, child in ipairs(shopFrame:GetChildren()) do
    if child:IsA("Frame") and not string.find(child.Name, "Padding") then
        local name = child.Name

        local priceNum = 0

        local priceTextObj = child:FindFirstChild("Frame")
            and child.Frame:FindFirstChild("Sheckles_Buy")
            and child.Frame.Sheckles_Buy:FindFirstChild("In_Stock")
            and child.Frame.Sheckles_Buy.In_Stock:FindFirstChild("Cost_Text")

        if priceTextObj and priceTextObj:IsA("TextLabel") then
            local priceText = priceTextObj.Text
            if typeof(priceText) == "string" then
                local matched = priceText:match("([%d,]+)")
                if matched then
                    local cleaned = matched:gsub(",", "")
                    priceNum = tonumber(cleaned) or 0
                else
                    warn("Price match failed for: " .. tostring(priceText))
                end
            end
        else
            warn("Missing Cost_Text for: " .. name)
        end

        table.insert(itemData, {
            name = name,
            price = priceNum
        })
    end
end

table.sort(itemData, function(a, b)
    return a.price < b.price
end)

local sortedNames = {}
for _, data in ipairs(itemData) do
    table.insert(sortedNames, data.name)
end

print("Detected items sorted by price:", table.concat(sortedNames, ", "))

tab.create_multidropdown({
    name = 'Select Items',
    flag = 'selectoption',
    section = 'left',
    option = nil, -- no default selected
    options = sortedNames,
    callback = function(value: string)
        print("Selected:", value)
    end
})

-- Safe resets
ui.Flags["selectoption"] = {}
ui.Flags["autobuy"] = false

-- Tracks what was bought this cycle
local lastStockBought = {}

local function runAutoBuy()
    local selected = ui.Flags["selectoption"]

    if typeof(selected) ~= "table" or #selected == 0 then
        -- skip if nothing selected
        return
    end

    local boughtSomething = false

    for _, child in ipairs(shopFrame:GetChildren()) do
        if child:IsA("Frame") and not string.find(child.Name, "Padding") then
            local name = child.Name

            if table.find(selected, name) then
                local stockTextObj = child:FindFirstChild("Main_Frame")
                    and child.Main_Frame:FindFirstChild("Stock_Text")

                local stockNumber = 0

                if stockTextObj and stockTextObj:IsA("TextLabel") then
                    local stockText = stockTextObj.Text
                    if typeof(stockText) == "string" then
                        stockNumber = tonumber(stockText:match("X(%d+)")) or 0
                    end
                end

                local lastBought = lastStockBought[name] or 0
                local toBuy = stockNumber - lastBought

                if toBuy > 0 then
                    print("Buying:", name, "Stock now:", stockNumber, "To buy:", toBuy)
                    for i = 1, toBuy do
                        local buyName = name
                        if buyName:lower():sub(-5) == " seed" then
                            buyName = buyName:sub(1, -6)
                        end

                        BuySeedStock:FireServer(buyName)
                    end
                    lastStockBought[name] = stockNumber
                    boughtSomething = true
                end
            end
        end
    end

    if boughtSomething then
        print("✅ Bought items this cycle.")
    end
end

tab.create_toggle({
    name = 'Enable Auto Buy',
    flag = 'autobuy',
    section = 'left',
    enabled = false, -- off by default
    callback = function(state: boolean)
        if state then
            print("Auto Buy Enabled manually.")
        else
            print("Auto Buy Disabled manually.")
        end
    end
})

-- Timer loop
task.spawn(function()
    local ranFor298 = false
    local ranFor30 = false

    while true do
        local timerObj = player.PlayerGui.Seed_Shop.Frame.Frame:FindFirstChild("Timer")
        if timerObj and timerObj:IsA("TextLabel") then
            local timeText = timerObj.Text
            local min, sec = timeText:match("(%d+)m (%d+)s")
            if min then
                local totalSec = tonumber(min) * 60 + tonumber(sec)

                -- exactly 4m 58s
                if totalSec == 298 and not ranFor298 then
                    print("Timer is EXACTLY 4m 58s → Auto Buy.")
                    lastStockBought = {} -- reset tracking
                    runAutoBuy()
                    ranFor298 = true
                end

                -- exactly 30s
                if totalSec == 30 and not ranFor30 then
                    print("Timer is EXACTLY 30s → Auto Buy.")
                    lastStockBought = {} -- reset tracking
                    runAutoBuy()
                    ranFor30 = true
                end

                -- Reset triggers for next cycle
                if totalSec > 298 then
                    ranFor298 = false
                end
                if totalSec > 30 then
                    ranFor30 = false
                end

                -- If seeds restock (time goes above 5 min), clear buy memory
                if totalSec > 300 then
                    lastStockBought = {}
                end
            end
        end

        -- If toggle ON, run every loop
        if ui.Flags["autobuy"] then
            runAutoBuy()
        end

        task.wait(0.5)
    end
end)
