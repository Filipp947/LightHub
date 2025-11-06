





local function an()
	repeat task.wait() until game:IsLoaded()

	local players = game:GetService("Players")
	local tween = game:GetService("TweenService")
	local plr = players.LocalPlayer

	local gui = Instance.new("ScreenGui")
	gui.Name = "LightHubLoading"
	gui.IgnoreGuiInset = true
	gui.ResetOnSpawn = false
	gui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
	gui.Parent = plr:WaitForChild("PlayerGui")

	local bg = Instance.new("Frame", gui)
	bg.Size = UDim2.fromScale(1,1)
	bg.BackgroundColor3 = Color3.fromRGB(0,0,0)
	bg.BackgroundTransparency = 1

	local dark = Instance.new("Frame", gui)
	dark.Size = UDim2.fromScale(1,1)
	dark.BackgroundColor3 = Color3.fromRGB(12,12,12)
	dark.BackgroundTransparency = 1

	local edge = Instance.new("Frame", gui)
	edge.Size = UDim2.fromScale(1,1)
	edge.BackgroundTransparency = 1
	local grad = Instance.new("UIGradient", edge)
	grad.Color = ColorSequence.new({
		ColorSequenceKeypoint.new(0, Color3.fromRGB(90,80,50)),
		ColorSequenceKeypoint.new(0.5, Color3.fromRGB(15,10,5)),
		ColorSequenceKeypoint.new(1, Color3.fromRGB(90,80,50))
	})
	grad.Rotation = 0

	local dustFolder = Instance.new("Folder", gui)
	for i = 1, 80 do
		local p = Instance.new("Frame", dustFolder)
		p.AnchorPoint = Vector2.new(0.5,0.5)
		p.Position = UDim2.fromScale(math.random(), math.random())
		p.Size = UDim2.fromOffset(math.random(2,4), math.random(2,4))
		p.BackgroundColor3 = Color3.fromRGB(255,230,120)
		p.BackgroundTransparency = 1
		local c = Instance.new("UICorner", p)
		c.CornerRadius = UDim.new(1,0)
	end

	local orb = Instance.new("Frame", gui)
	orb.AnchorPoint = Vector2.new(0.5,0.45)
	orb.Position = UDim2.fromScale(0.5,0.45)
	orb.Size = UDim2.fromScale(0.25,0.25)
	orb.BackgroundColor3 = Color3.fromRGB(255,220,120)
	orb.BackgroundTransparency = 1
	local oc = Instance.new("UICorner", orb)
	oc.CornerRadius = UDim.new(1,0)

	local core = Instance.new("Frame", orb)
	core.AnchorPoint = Vector2.new(0.5,0.5)
	core.Position = UDim2.fromScale(0.5,0.5)
	core.Size = UDim2.fromScale(0.6,0.6)
	core.BackgroundColor3 = Color3.fromRGB(255,255,200)
	core.BackgroundTransparency = 1
	local cc = Instance.new("UICorner", core)
	cc.CornerRadius = UDim.new(1,0)

	local halo = Instance.new("Frame", orb)
	halo.AnchorPoint = Vector2.new(0.5,0.5)
	halo.Position = UDim2.fromScale(0.5,0.5)
	halo.Size = UDim2.fromScale(1.5,1.5)
	halo.BackgroundColor3 = Color3.fromRGB(255,240,180)
	halo.BackgroundTransparency = 1
	local hc = Instance.new("UICorner", halo)
	hc.CornerRadius = UDim.new(1,0)
	local hs = Instance.new("UIStroke", halo)
	hs.Thickness = 2
	hs.Color = Color3.fromRGB(255,220,100)
	hs.Transparency = 1

	local text = Instance.new("TextLabel", gui)
	text.AnchorPoint = Vector2.new(0.5,0)
	text.Position = UDim2.fromScale(0.5,0.78)
	text.Size = UDim2.fromScale(0.8,0.1)
	text.BackgroundTransparency = 1
	text.TextColor3 = Color3.fromRGB(255,255,255)
	text.Font = Enum.Font.GothamBold
	text.TextScaled = true
	text.TextTransparency = 1
	text.Text = ""

	local function tw(o,t,st,dir,p)
		return tween:Create(o, TweenInfo.new(t,st,dir), p)
	end

	task.spawn(function()
		while gui and gui.Parent do
			local t1 = tw(grad,1.8,Enum.EasingStyle.Sine,Enum.EasingDirection.InOut,{
				Color = ColorSequence.new({
					ColorSequenceKeypoint.new(0, Color3.fromRGB(100,85,50)),
					ColorSequenceKeypoint.new(0.5, Color3.fromRGB(20,15,10)),
					ColorSequenceKeypoint.new(1, Color3.fromRGB(100,85,50))
				})
			})
			t1:Play()
			t1.Completed:Wait()
			local t2 = tw(grad,1.8,Enum.EasingStyle.Sine,Enum.EasingDirection.InOut,{
				Color = ColorSequence.new({
					ColorSequenceKeypoint.new(0, Color3.fromRGB(80,70,40)),
					ColorSequenceKeypoint.new(0.5, Color3.fromRGB(15,10,5)),
					ColorSequenceKeypoint.new(1, Color3.fromRGB(80,70,40))
				})
			})
			t2:Play()
			t2.Completed:Wait()
		end
	end)

	task.spawn(function()
		while gui and gui.Parent do
			for _,d in ipairs(dustFolder:GetChildren()) do
				tw(d, 3, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, {
					Position = UDim2.fromScale(math.random(), math.random()),
					BackgroundTransparency = math.random(70,95)/100
				}):Play()
			end
			task.wait(3)
		end
	end)

	tw(bg, 1, Enum.EasingStyle.Sine, Enum.EasingDirection.Out, {BackgroundTransparency = 0}):Play()
	tw(dark, 1, Enum.EasingStyle.Sine, Enum.EasingDirection.Out, {BackgroundTransparency = 0.35}):Play()
	tw(edge, 1, Enum.EasingStyle.Sine, Enum.EasingDirection.Out, {BackgroundTransparency = 0}):Play()

	task.wait(0.5)
	tw(orb, 0.8, Enum.EasingStyle.Quad, Enum.EasingDirection.Out, {BackgroundTransparency = 0.2}):Play()
	tw(core, 0.8, Enum.EasingStyle.Quad, Enum.EasingDirection.Out, {BackgroundTransparency = 0.05}):Play()
	tw(hs, 1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out, {Transparency = 0.4}):Play()
	tw(halo, 1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out, {BackgroundTransparency = 0.8}):Play()

	task.wait(0.6)
	for i = 1, 3 do
		local up = tw(core,0.3,Enum.EasingStyle.Sine,Enum.EasingDirection.Out,{Size=UDim2.fromScale(0.7,0.7),BackgroundTransparency=0})
		up:Play() up.Completed:Wait()
		local down = tw(core,0.3,Enum.EasingStyle.Sine,Enum.EasingDirection.In,{Size=UDim2.fromScale(0.6,0.6),BackgroundTransparency=0.1})
		down:Play() down.Completed:Wait()
	end

	for i=1,2 do
		local expand = tw(halo,0.5,Enum.EasingStyle.Sine,Enum.EasingDirection.Out,{Size=UDim2.fromScale(1.7,1.7),BackgroundTransparency=0.6})
		expand:Play() expand.Completed:Wait()
		local fade = tw(halo,0.5,Enum.EasingStyle.Sine,Enum.EasingDirection.In,{Size=UDim2.fromScale(1.5,1.5),BackgroundTransparency=0.8})
		fade:Play() fade.Completed:Wait()
	end

	text.TextTransparency = 0
	local word = "Light Hub"
	for i = 1, #word do
		text.Text = string.sub(word, 1, i)
		task.wait(0.075)
	end

	local bright = tw(orb,0.4,Enum.EasingStyle.Sine,Enum.EasingDirection.Out,{BackgroundTransparency=0})
	bright:Play() bright.Completed:Wait()
	local dim = tw(orb,0.4,Enum.EasingStyle.Sine,Enum.EasingDirection.In,{BackgroundTransparency=0.2})
	dim:Play()

	task.wait(2)
	tw(text,0.8,Enum.EasingStyle.Sine,Enum.EasingDirection.In,{TextTransparency=1}):Play()
	tw(core,0.8,Enum.EasingStyle.Quad,Enum.EasingDirection.In,{BackgroundTransparency=1}):Play()
	tw(orb,0.8,Enum.EasingStyle.Quad,Enum.EasingDirection.In,{BackgroundTransparency=1}):Play()
	tw(halo,0.8,Enum.EasingStyle.Quad,Enum.EasingDirection.In,{BackgroundTransparency=1}):Play()
	tw(hs,0.8,Enum.EasingStyle.Quad,Enum.EasingDirection.In,{Transparency=1}):Play()
	tw(edge,1,Enum.EasingStyle.Sine,Enum.EasingDirection.In,{BackgroundTransparency=1}):Play()
	tw(dark,1,Enum.EasingStyle.Sine,Enum.EasingDirection.In,{BackgroundTransparency=1}):Play()
	tw(bg,1,Enum.EasingStyle.Sine,Enum.EasingDirection.In,{BackgroundTransparency=1}):Play()

	task.wait(1.3)
	gui:Destroy()
end

an()

local a = game:GetService("Players").LocalPlayer
local b = a:WaitForChild("PlayerGui")
local c = game:GetService("TweenService")
local d = Instance.new("ScreenGui")
d.Name = "lighthubkeysys"
d.ResetOnSpawn = false
d.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
d.Parent = b
local e = workspace.CurrentCamera.ViewportSize
local f = Instance.new("UIScale")
f.Parent = d
local function g()
    local h = math.min(e.X, e.Y)
    local i = 1080
    f.Scale = math.clamp(h / i, 0.65, 1.15)
end
g()
workspace.CurrentCamera:GetPropertyChangedSignal("ViewportSize"):Connect(
    function()
        e = workspace.CurrentCamera.ViewportSize
        g()
    end
)
local j = Instance.new("Frame")
j.Name = "KeySystem"
j.Parent = d
j.AnchorPoint = Vector2.new(0.5, 0.5)
j.BackgroundColor3 = Color3.fromRGB(10, 10, 10)
j.BackgroundTransparency = 0.25
j.BorderSizePixel = 0
j.Position = UDim2.new(0.5, 0, 0.5, 0)
j.Size = UDim2.new(0.85, 0, 0.9, 0)
j.Visible = false
local k = Instance.new("UICorner", j)
k.CornerRadius = UDim.new(0, 15)
local l = Instance.new("UIStroke", j)
l.Thickness = 1.5
l.Color = Color3.fromRGB(255, 60, 60)
l.Transparency = 0.7
l.ApplyStrokeMode = Enum.ApplyStrokeMode.Border
local m = Instance.new("TextLabel")
m.Parent = j
m.BackgroundTransparency = 1
m.Position = UDim2.new(0, 10, 0, 85)
m.Size = UDim2.new(1, -20, 0, 20)
m.Font = Enum.Font.GothamBold
m.Text = "[Light Hub] Key System"
m.TextColor3 = Color3.new(1, 1, 1)
m.TextSize = 18
m.TextYAlignment = Enum.TextYAlignment.Top
local n = Instance.new("ImageButton")
n.Parent = j
n.AnchorPoint = Vector2.new(1, 0)
n.BackgroundTransparency = 1
n.Position = UDim2.new(1, -10, 0, 45)
n.Size = UDim2.new(0, 25, 0, 25)
n.Image = "rbxassetid://3926307971"
n.ImageRectOffset = Vector2.new(884, 284)
n.ImageRectSize = Vector2.new(36, 36)
local o = Instance.new("TextBox")
o.Parent = j
o.AnchorPoint = Vector2.new(0, 1)
o.BackgroundColor3 = Color3.fromRGB(25, 25, 25)
o.BackgroundTransparency = 0.2
o.BorderSizePixel = 0
o.Position = UDim2.new(0, 25, 1, -137)
o.Size = UDim2.new(1, -50, 0, 50)
o.ClearTextOnFocus = false
o.Font = Enum.Font.Code
o.PlaceholderText = "Insert the Key Here!"
o.TextColor3 = Color3.fromRGB(230, 230, 230)
o.TextSize = 16
o.Text = ""
Instance.new("UICorner", o).CornerRadius = UDim.new(0, 5)
local function p(q, r, s, t)
    local u = Instance.new("TextButton")
    u.Name = q
    u.Parent = j
    u.AnchorPoint = Vector2.new(0.5, 1)
    u.BackgroundColor3 = r
    u.BorderSizePixel = 0
    u.Position = s
    u.Size = UDim2.new(0, 120, 0, 40)
    u.Font = Enum.Font.GothamBold
    u.Text = t
    u.TextColor3 = Color3.new(1, 1, 1)
    u.TextSize = 16
    Instance.new("UICorner", u).CornerRadius = UDim.new(0, 6)
    local v = Instance.new("UIStroke", u)
    v.Thickness = 1.2
    v.Color = Color3.fromRGB(255, 255, 255)
    v.Transparency = 0.85
    return u
end
local w = p("ApproveKeyB", Color3.fromRGB(195, 57, 57), UDim2.new(0.5, 0, 1, -76), "Check Key")
local x = p("GetKeyB", Color3.fromRGB(195, 57, 57), UDim2.new(0.5, -125, 1, -76), "Get Key")
x.BackgroundTransparency = 0.5
local y = p("JoinDiscordB", Color3.fromRGB(38, 38, 38), UDim2.new(0.5, 125, 1, -76), "Join Discord")
local z = Instance.new("TextLabel")
z.Parent = j
z.BackgroundTransparency = 1
z.Position = UDim2.new(0, 10, 0, 110)
z.Size = UDim2.new(1, -20, 0, 40)
z.Font = Enum.Font.Gotham
z.Text = 'Press "Get Key" to get started!'
z.TextColor3 = Color3.new(1, 1, 1)
z.TextSize = 14
z.TextWrapped = true
local A = Instance.new("Frame")
A.Parent = d
A.AnchorPoint = Vector2.new(1, 1)
A.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
A.BackgroundTransparency = 0.5
A.Position = UDim2.new(1, -10, 1, -10)
A.Size = UDim2.new(0, 42, 0, 42)
Instance.new("UICorner", A).CornerRadius = UDim.new(0, 10)
local B = Instance.new("TextButton")
B.Parent = A
B.BackgroundTransparency = 1
B.Size = UDim2.new(1, 0, 1, 0)
B.Text = ""
local C = Instance.new("ImageLabel")
C.Parent = B
C.AnchorPoint = Vector2.new(0.5, 0.5)
C.BackgroundTransparency = 1
C.Position = UDim2.new(0.5, 0, 0.5, 0)
C.Size = UDim2.new(0.7, 0, 0.7, 0)
C.Image = "http://www.roblox.com/asset/?id=15861930865"
j.Visible = true
j.BackgroundTransparency = 1
j.Size = UDim2.new(0.85, 0, 0.7, 0)
f.Scale = 0.8
c:Create(
    j,
    TweenInfo.new(0.7, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
    {BackgroundTransparency = 0.25, Size = UDim2.new(0.85, 0, 0.9, 0)}
):Play()
c:Create(
    f,
    TweenInfo.new(0.7, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
    {Scale = math.clamp(math.min(e.X, e.Y) / 1080, 0.65, 1.15)}
):Play()
task.spawn(
    function()
        while task.wait(1) do
            pcall(
                function()
                    c:Create(
                        l,
                        TweenInfo.new(1, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut),
                        {Transparency = 0.5}
                    ):Play()
                    task.wait(1)
                    c:Create(
                        l,
                        TweenInfo.new(1, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut),
                        {Transparency = 0.8}
                    ):Play()
                end
            )
        end
    end
)
makefolder("Light Hub")
local D = "Light Hub/Key.txt"
script_key = script_key or isfile(D) and readfile(D) or nil
local E = loadstring(game:HttpGet("https://sdkAPI-public.luarmor.net/library.lua"))()
E.script_id = "53bfeeeca30266553e39e7e2a522336c"
local F = {
    [7326934954] = "https://api.luarmor.net/files/v3/loaders/53bfeeeca30266553e39e7e2a522336c.lua",
    [8316902627] = "https://api.luarmor.net/files/v3/loaders/f020a6c36f648cab3f8cee0eebdd3930.lua",
    [6331902150] = "https://api.luarmor.net/files/v3/loaders/986f8c7d1a33f1040d7a3cdc02d5504b.lua",
    [66654135] = "https://api.luarmor.net/files/v3/loaders/0cb08504db4379defa3e11f598619b2b.lua",
	[994732206] = "https://api.luarmor.net/files/v3/loaders/da85d74ed1eda27de6bf481960ff649b.lua"
}
local function G(H)
    local I = E.check_key(H or script_key)
    if I.code == "KEY_VALID" then
        script_key = H or script_key
		d:Destroy()
        writefile(D, script_key)
        if F[game.GameId] then
            loadstring(game:HttpGet(F[game.GameId]))()
        elseif game.PlaceId == 96342491571673 or game.PlaceId == 109983668079237 then
			loadstring(game:HttpGet("https://api.luarmor.net/files/v3/loaders/152436098dce50a55092dc524c4d485a.lua"))()
		else
            a:Kick("Game not supported.")
        end
    elseif I.code:find("KEY_") then
        warn("Key Check Failed: " .. I.code)
    else
        a:Kick("Key check failed: " .. I.message)
    end
end
if script_key then
    G()
end
local J = function()
    setclipboard("https://ads.luarmor.net/get_key?for=Light_Hub-hjhJoieYQkOu")
end
local K = function(L)
    G(L)
end
local M = function()
    setclipboard("https://discord.gg/Z5TBEsec5W")
end
local N = function()
    d:Destroy()
end
x.MouseButton1Click:Connect(J)
w.MouseButton1Click:Connect(
    function()
        K(o.Text)
    end
)
y.MouseButton1Click:Connect(M)
n.MouseButton1Click:Connect(N)
B.MouseButton1Click:Connect(
    function()
        j.Visible = not j.Visible
    end
)
